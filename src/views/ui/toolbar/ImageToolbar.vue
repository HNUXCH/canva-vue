<template>
  <div class="image-toolbar">
    <!-- 图片工具栏内容 -->
    <button>裁剪</button>
    <button>旋转</button>
    <button>滤镜</button>
    <button>透明度</button>
    <button>边框</button>
    <button>阴影</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageToolbar',
  setup() {
    return {}
  }
})
</script>

<style scoped>
.image-toolbar {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
