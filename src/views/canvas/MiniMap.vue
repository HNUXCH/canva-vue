<template>
  <div class="mini-map">
    <div class="mini-map-content" ref="miniMap"></div>
    <div class="viewport-indicator" :style="viewportIndicatorStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'MiniMap',
  props: {
    scale: {
      type: Number,
      default: 1
    },
    offsetX: {
      type: Number,
      default: 0
    },
    offsetY: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const miniMap = ref<HTMLElement | null>(null)
    
    const viewportIndicatorStyle = computed(() => ({
      width: `${100 / props.scale}%`,
      height: `${100 / props.scale}%`,
      left: `${props.offsetX}px`,
      top: `${props.offsetY}px`
    }))

    return {
      miniMap,
      viewportIndicatorStyle
    }
  }
})
</script>

<style scoped>
.mini-map {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 200px;
  height: 120px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.mini-map-content {
  width: 100%;
  height: 100%;
}

.viewport-indicator {
  position: absolute;
  border: 2px solid #4285f4;
  pointer-events: none;
}
</style>
