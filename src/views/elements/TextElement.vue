<template>
  <div class="text-element" :style="textStyle">
    {{ content }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextElement',
  props: {
    content: {
      type: String,
      default: '双击编辑文本'
    },
    fontSize: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: '#000000'
    },
    fontFamily: {
      type: String,
      default: 'Arial'
    },
    fontWeight: {
      type: String,
      default: 'normal'
    }
  },
  setup(props) {
    const textStyle = {
      fontSize: `${props.fontSize}px`,
      color: props.color,
      fontFamily: props.fontFamily,
      fontWeight: props.fontWeight
    }
    return {
      textStyle
    }
  }
})
</script>

<style scoped>
.text-element {
  position: absolute;
  white-space: pre-wrap;
  cursor: text;
}
</style>
