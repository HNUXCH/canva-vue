/**
 * 元素拖拽 Composable (用于 DOM 渲染的元素)
 * 功能:处理元素的点击选中和拖拽移动
 * 优化策略：
 * 1. 拖拽时直接操作 DOM transform，避免触发 Vue 响应式更新
 * 2. 使用 RAF 节流，减少渲染频率
 * 3. 拖拽结束时才更新 Store
 */
import { ref, onUnmounted, type Ref } from 'vue'
import { useElementsStore } from '@/stores/elements'
import { useSelectionStore } from '@/stores/selection'

export function useElementDrag(elementId: string, elementRef?: Ref<HTMLElement | undefined>) {
  const elementsStore = useElementsStore()
  const selectionStore = useSelectionStore()
  
  const isDragging = ref(false)
  const dragStartPos = ref({ x: 0, y: 0 })
  const totalOffset = ref({ x: 0, y: 0 }) // 累计偏移量
  let animationFrameId: number | null = null

  /**
   * 鼠标按下 - 开始拖拽
   */
  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation()
    
    // 选中当前元素
    selectionStore.selectElement(elementId)
    
    // 记录拖拽起始位置
    isDragging.value = true
    dragStartPos.value = { x: e.clientX, y: e.clientY }
    totalOffset.value = { x: 0, y: 0 }
    
    // 保存初始 transform
    if (elementRef?.value) {
      const element = elementsStore.getElementById(elementId)
      if (element) {
        elementRef.value.classList.add('dragging')
      }
    }
    
    // 绑定全局事件
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  /**
   * 鼠标移动 - 拖拽中（使用 RAF 节流 + 直接 DOM 操作）
   */
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    
    const dx = e.clientX - dragStartPos.value.x
    const dy = e.clientY - dragStartPos.value.y
    
    // 只有移动超过2像素才认为是拖拽
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return
    
    totalOffset.value = { x: dx, y: dy }
    
    // 使用 RAF 节流，避免过度渲染
    if (animationFrameId !== null) {
      return // 已有待处理的帧，跳过
    }
    
    animationFrameId = requestAnimationFrame(() => {
      // 直接操作 DOM，避免触发 Vue 响应式更新
      if (elementRef?.value) {
        const element = elementsStore.getElementById(elementId)
        if (element) {
          const newX = element.x + totalOffset.value.x
          const newY = element.y + totalOffset.value.y
          elementRef.value.style.transform = `translate(${newX}px, ${newY}px) rotate(${element.rotation}deg)`
        }
      }
      
      animationFrameId = null
    })
  }

  /**
   * 鼠标抬起 - 结束拖拽（此时才更新 Store）
   */
  const handleMouseUp = () => {
    if (!isDragging.value) return
    
    // 取消待处理的动画帧
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    
    // 移除拖拽类
    if (elementRef?.value) {
      elementRef.value.classList.remove('dragging')
    }
    
    // 应用最终偏移到 Store（只在有实际移动时）
    if (Math.abs(totalOffset.value.x) > 1 || Math.abs(totalOffset.value.y) > 1) {
      const selectedIds = selectionStore.selectedIds
      const isMultiSelect = selectedIds.length > 1 && selectedIds.includes(elementId)
      
      if (isMultiSelect) {
        // 多选拖拽:移动所有选中的元素
        elementsStore.moveElements(selectedIds, totalOffset.value.x, totalOffset.value.y)
      } else {
        // 单选拖拽
        elementsStore.moveElement(elementId, totalOffset.value.x, totalOffset.value.y)
      }
      
      elementsStore.saveToLocal()
    }
    
    isDragging.value = false
    totalOffset.value = { x: 0, y: 0 }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  // 组件卸载时清理事件
  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  })

  return {
    handleMouseDown,
    isDragging
  }
}
