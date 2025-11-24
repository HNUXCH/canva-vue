<template>
  <div class="shape-element">
    <!-- 图形元素内容 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShapeElement',
  props: {
    type: {
      type: String,
      default: 'rect'
    },
    fill: {
      type: String,
      default: '#ffffff'
    },
    stroke: {
      type: String,
      default: '#000000'
    },
    strokeWidth: {
      type: Number,
      default: 1
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.shape-element {
  position: absolute;
}
</style>
