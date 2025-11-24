<template>
  <div class="selection-overlay">
    <!-- 选中框内容 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectionOverlay',
  setup() {
    return {}
  }
})
</script>

<style scoped>
.selection-overlay {
  position: absolute;
  border: 2px dashed #4285f4;
  pointer-events: none;
}
</style>
