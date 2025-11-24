import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    stack: [],
    index: -1
  })
})
