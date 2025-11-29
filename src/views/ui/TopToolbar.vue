<template>
  <div class="top-toolbar">
    <div class="toolbar-group">
      <button 
        class="tool-btn" 
        :class="{ active: currentTool === 'select' }" 
        @click="setTool('select')"
        title="选择工具 (V)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
          <path d="M13 13l6 6"></path>
        </svg>
      </button>
    </div>

    <div class="divider"></div>

    <div class="toolbar-group">
      <button 
        class="tool-btn" 
        :class="{ active: currentTool === 'rectangle' }" 
        @click="setTool('rectangle')"
        title="矩形工具 (R)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        </svg>
      </button>
      
      <button 
        class="tool-btn" 
        :class="{ active: currentTool === 'circle' }" 
        @click="setTool('circle')"
        title="圆形工具 (O)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </button>
      
      <button 
        class="tool-btn" 
        :class="{ active: currentTool === 'triangle' }" 
        @click="setTool('triangle')"
        title="三角形工具 (T)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12,2 22,22 2,22"></polygon>
        </svg>
      </button>
      <button
        class="tool-btn"
        :class="{ active: currentTool === 'text' }"
        @click="setTool('text')"
        title="文本工具 (T)"
      >
        <svg t="1764240140475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5065" width="32" height="32"><path d="M429.056 919.552h166.4l-0.512-1.024c-32.768-40.96-50.688-92.16-50.688-144.384V228.352h154.112c44.032 0 87.04 14.848 121.856 42.496l11.776 9.216V154.112s-128 20.48-319.488 20.48-321.024-20.48-321.024-20.48v125.44l8.192-6.656c35.328-28.672 79.36-44.544 124.928-44.544h155.648v545.28c0 52.736-17.92 103.424-50.688 144.384l-0.512 1.536z" fill="#2c2c2c" p-id="5066"></path></svg>
      </button>
      
      <button
        class="tool-btn"
        @click="handleImageUpload"
        title="上传图片 (I)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </button>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCanvasStore, type ToolType } from '@/stores/canvas'
import { useElementsStore } from '@/stores/elements'

const canvasStore = useCanvasStore()
const elementsStore = useElementsStore()
const currentTool = computed(() => canvasStore.currentTool)
const fileInput = ref<HTMLInputElement | null>(null)

// 配置常量
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_DIMENSION = 4096 // 最大宽高限制

const setTool = (tool: ToolType) => {
  canvasStore.setTool(tool)
  console.log('Tool selected:', tool)
}

const handleImageUpload = () => {
  fileInput.value?.click()
}

// 压缩图片（如果需要）
const compressImage = (img: HTMLImageElement, maxSize: number = 2000): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    let width = img.width
    let height = img.height

    // 如果图片过大，进行压缩
    if (width > maxSize || height > maxSize) {
      const ratio = Math.min(maxSize / width, maxSize / height)
      width = Math.floor(width * ratio)
      height = Math.floor(height * ratio)
    }

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0, width, height)
      // 使用较高质量的JPEG压缩
      resolve(canvas.toDataURL('image/jpeg', 0.9))
    } else {
      resolve(img.src)
    }
  })
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  // 清空input，允许重复上传同一文件
  target.value = ''
  
  if (!file) return
  
  // 1. 验证文件类型
  if (!ALLOWED_TYPES.includes(file.type)) {
    alert(`不支持的图片格式！\n支持的格式：JPEG, PNG, GIF, WebP, SVG`)
    return
  }
  
  // 2. 验证文件大小
  if (file.size > MAX_FILE_SIZE) {
    alert(`图片文件过大！\n当前大小：${(file.size / 1024 / 1024).toFixed(2)}MB\n最大限制：${MAX_FILE_SIZE / 1024 / 1024}MB`)
    return
  }
  
  try {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      const src = e.target?.result as string
      
      // 加载图片获取尺寸
      const img = new Image()
      
      img.onload = async () => {
        // 3. 验证图片尺寸
        if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
          alert(`图片尺寸过大！\n当前尺寸：${img.width}x${img.height}\n最大限制：${MAX_DIMENSION}x${MAX_DIMENSION}`)
          return
        }
        
        // 4. 压缩大图片（超过2000px）
        let finalSrc = src
        if (img.width > 2000 || img.height > 2000) {
          console.log('压缩图片中...')
          finalSrc = await compressImage(img, 2000)
        }
        
        // 5. 计算画布上的显示尺寸
        const maxWidth = 400
        const maxHeight = 400
        let width = img.width
        let height = img.height
        
        // 等比缩放到合适的显示尺寸
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = width * ratio
          height = height * ratio
        }
        
        // 6. 添加图片元素到画布中心
        elementsStore.addImage({
          src: finalSrc,
          x: 100,
          y: 100,
          width,
          height,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          zIndex: elementsStore.elements.length,
          filters: [],
          naturalWidth: img.width,
          naturalHeight: img.height
        })
        
        console.log(`图片上传成功：${file.name} (${(file.size / 1024).toFixed(2)}KB)`)
      }
      
      img.onerror = () => {
        alert('图片加载失败，请确认文件是否损坏')
      }
      
      img.src = src
    }
    
    reader.onerror = () => {
      alert('文件读取失败，请重试')
    }
    
    reader.readAsDataURL(file)
    
  } catch (error) {
    console.error('图片上传错误:', error)
    alert('图片上传失败，请重试')
  }
}
</script>

<style scoped>
.top-toolbar {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.toolbar-group {
  display: flex;
  gap: 4px;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #e0e0e0;
  margin: 0 4px;
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}

.tool-btn:hover {
  background-color: #f0f0f0;
  color: #333;
}

.tool-btn.active {
  background-color: #e6f0ff;
  color: #0066ff;
}

.tool-btn svg {
  display: block;
}
</style>
