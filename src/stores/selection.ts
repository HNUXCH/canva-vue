import { defineStore } from 'pinia'

export const useSelectionStore = defineStore('selection', {
  state: () => ({
    selectedIds: []
  })
})
