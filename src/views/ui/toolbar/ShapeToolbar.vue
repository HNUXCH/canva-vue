<template>
  <div class="shape-toolbar">
    <!-- 图形工具栏内容 -->
    <button>矩形</button>
    <button>圆形</button>
    <button>三角形</button>
    <button>填充颜色</button>
    <button>边框颜色</button>
    <button>边框粗细</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShapeToolbar',
  setup() {
    return {}
  }
})
</script>

<style scoped>
.shape-toolbar {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
