<!--
View层 - 画布容器组件
职责：提供 PIXI 渲染引擎的挂载点和图片元素渲染
-->
<template>
  <div>
    <top-toolbar />
    <floating-toolbar />
    <image-toolbar />
    <selection-overlay />
    <div ref="container" class="pixi-canvas">
      <!-- 渲染图片元素 -->
      <image-element
        v-for="imageEl in imageElements"
        :key="imageEl.id"
        :element="imageEl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, computed } from 'vue'
import Stats from 'stats.js'
import TopToolbar from '../../views/ui/TopToolbar.vue'
import FloatingToolbar from '../../views/ui/FloatingToolbar.vue'
import ImageToolbar from '../../views/ui/toolbar/ImageToolbar.vue'
import SelectionOverlay from '../../views/overlays/SelectionOverlay.vue'
import ImageElement from '../../views/elements/ImageElement.vue'
import { useCanvas } from '@/composables/useCanvas'
import { useElementsStore } from '@/stores/elements'
import type { ImageElement as ImageElementType } from '@/cores/types/element'

const { container, canvasService } = useCanvas()
const elementsStore = useElementsStore()

// 提供 canvasService 给子组件使用
provide('canvasService', canvasService)

// 获取所有图片元素
const imageElements = computed(() => 
  elementsStore.elements.filter(el => el.type === 'image') as ImageElementType[]
)
// todo 测试 stats.js 性能监控，正式环境移除
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let stats: any = null
onMounted(() => {
  stats = new Stats()
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3: custom
  document.body.appendChild(stats.dom)

  function animate() {
    stats.begin()
    // ...你的渲染逻辑...
    stats.end()
    requestAnimationFrame(animate)
  }
  animate()
})

onUnmounted(() => {
  if (stats && stats.dom && stats.dom.parentNode) {
    stats.dom.parentNode.removeChild(stats.dom)
  }
})
</script>

<style scoped>
.pixi-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}
</style>
