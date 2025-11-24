<template>
  <div class="transform-handles">
    <!-- 8个调整大小的控制点 -->
    <div class="resize-handle nw"></div>
    <div class="resize-handle n"></div>
    <div class="resize-handle ne"></div>
    <div class="resize-handle e"></div>
    <div class="resize-handle se"></div>
    <div class="resize-handle s"></div>
    <div class="resize-handle sw"></div>
    <div class="resize-handle w"></div>
    
    <!-- 1个旋转控制点 -->
    <div class="rotate-handle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TransformHandles',
  setup() {
    return {}
  }
})
</script>

<style scoped>
.transform-handles {
  position: absolute;
}

.resize-handle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border: 1px solid #4285f4;
  border-radius: 50%;
}

.rotate-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #4285f4;
  border-radius: 50%;
}
</style>
