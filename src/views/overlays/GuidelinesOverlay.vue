<!--
View层 - 对齐辅助线组件
职责：在拖拽元素时显示对齐参考线
-->
<template>
  <div class="guidelines">
    <!-- 垂直辅助线 (X轴对齐) -->
    <div
      v-for="(x, index) in verticalLines"
      :key="`v-${index}`"
      class="vertical-guideline"
      :style="{ left: `${x}px` }"
    />
    
    <!-- 水平辅助线 (Y轴对齐) -->
    <div
      v-for="(y, index) in horizontalLines"
      :key="`h-${index}`"
      class="horizontal-guideline"
      :style="{ top: `${y}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGuidelinesStore } from '@/stores/guidelines'

const guidelinesStore = useGuidelinesStore()
const { verticalLines, horizontalLines } = storeToRefs(guidelinesStore)
</script>

<style scoped>
.guidelines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: visible; /* 允许辅助线溢出容器 */
}

.horizontal-guideline {
  position: absolute;
  left: -100000px; /* 向左延伸 */
  width: 200000px; /* 足够长 */
  height: 1px;
  background: #ff4081;
  box-shadow: 0 0 2px rgba(255, 64, 129, 0.5);
}

.vertical-guideline {
  position: absolute;
  top: -100000px; /* 向上延伸 */
  width: 1px;
  height: 200000px; /* 足够长 */
  background: #ff4081;
  box-shadow: 0 0 2px rgba(255, 64, 129, 0.5);
}
</style>
