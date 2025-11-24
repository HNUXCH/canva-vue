<template>
  <div class="image-element">
    <img :src="src" :style="{ width: width + 'px', height: height + 'px' }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageElement',
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    opacity: {
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
.image-element {
  position: absolute;
}
</style>
