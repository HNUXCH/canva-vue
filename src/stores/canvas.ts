import { defineStore } from 'pinia'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    width: 0,
    height: 0,
    scale: 1,
    offsetX: 0,
    offsetY: 0
  })
})
