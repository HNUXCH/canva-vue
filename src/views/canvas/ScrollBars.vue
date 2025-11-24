<template>
  <div class="scroll-bars">
    <div class="horizontal-scrollbar" ref="horizontalScrollbar">
      <div class="scrollbar-thumb" :style="horizontalThumbStyle"></div>
    </div>
    <div class="vertical-scrollbar" ref="verticalScrollbar">
      <div class="scrollbar-thumb" :style="verticalThumbStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'ScrollBars',
  props: {
    offsetX: {
      type: Number,
      default: 0
    },
    offsetY: {
      type: Number,
      default: 0
    },
    contentWidth: {
      type: Number,
      default: 0
    },
    contentHeight: {
      type: Number,
      default: 0
    },
    viewportWidth: {
      type: Number,
      default: 0
    },
    viewportHeight: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const horizontalScrollbar = ref<HTMLElement | null>(null)
    const verticalScrollbar = ref<HTMLElement | null>(null)

    const horizontalThumbStyle = computed(() => ({
      width: `${(props.viewportWidth / props.contentWidth) * 100}%`,
      left: `${(props.offsetX / props.contentWidth) * 100}%`
    }))

    const verticalThumbStyle = computed(() => ({
      height: `${(props.viewportHeight / props.contentHeight) * 100}%`,
      top: `${(props.offsetY / props.contentHeight) * 100}%`
    }))

    return {
      horizontalScrollbar,
      verticalScrollbar,
      horizontalThumbStyle,
      verticalThumbStyle
    }
  }
})
</script>

<style scoped>
.scroll-bars {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 16px;
}

.horizontal-scrollbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 16px;
  height: 16px;
  background: #f0f0f0;
}

.vertical-scrollbar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 16px;
  width: 16px;
  background: #f0f0f0;
}

.scrollbar-thumb {
  position: absolute;
  background: #c1c1c1;
  border-radius: 8px;
}

.horizontal-scrollbar .scrollbar-thumb {
  height: 8px;
  top: 4px;
  min-width: 20px;
}

.vertical-scrollbar .scrollbar-thumb {
  width: 8px;
  left: 4px;
  min-height: 20px;
}
</style>
