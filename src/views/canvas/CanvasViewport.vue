<template>
  <div class="canvas-viewport" ref="viewport">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CanvasViewport',
  setup() {
    const viewport = ref<HTMLElement | null>(null)
    const scale = ref(1)
    const offsetX = ref(0)
    const offsetY = ref(0)

    return {
      viewport,
      scale,
      offsetX,
      offsetY
    }
  }
})
</script>

<style scoped>
.canvas-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
