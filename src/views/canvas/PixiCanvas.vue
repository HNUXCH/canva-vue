<!-- 
View层 - 画布容器组件
职责：提供PIXI渲染引擎的容器，负责图形、图片、文本的实际绘制
解决的问题：
1. 为PIXI渲染引擎提供挂载点
2. 管理画布的基础渲染循环
3. 协调子组件的渲染顺序
-->
<template>
  <div class="pixi-canvas">
    <!-- 画布内容 -->
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'PixiCanvas',
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null)

    onMounted(() => {
      if (canvas.value) {
        // 初始化画布
        const ctx = canvas.value.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
        }
      }
    })

    return {
      canvas
    }
  }
})
</script>

<style scoped>
.pixi-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.pixi-canvas canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
