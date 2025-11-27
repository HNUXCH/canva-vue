import { defineStore } from 'pinia'
import type { AnyElement } from '@/cores/types/element'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    stack: [] as AnyElement[][],       // 存储 elements 的快照
    index: -1,                // 当前指针
    maxSize: 200              // 最大历史记录
  }),

  actions: {
    /** 记录快照 */
    pushSnapshot(snapshot: AnyElement[]) {
      // 若曾经 undo 过，则需要截断未来记录
      if (this.index < this.stack.length - 1) {
        this.stack = this.stack.slice(0, this.index + 1)
      }

      // 限制最大长度
      if (this.stack.length >= this.maxSize) {
        this.stack.shift()
        this.index--
      }

      this.stack.push(JSON.parse(JSON.stringify(snapshot)))
      this.index++
    },

    /** 撤销 */
    undo(): AnyElement[] | null {
      if (this.index <= 0) return null
      this.index--
      return JSON.parse(JSON.stringify(this.stack[this.index]))
    },

    /** 重做 */
    redo(): AnyElement[] | null {
      if (this.index >= this.stack.length - 1) return null
      this.index++
      return JSON.parse(JSON.stringify(this.stack[this.index]))
    },

    /** 获取当前快照 */
    getCurrent(): AnyElement[] | null {
      if (this.index < 0) return null
      return JSON.parse(JSON.stringify(this.stack[this.index]))
    },

    /** 清除全部记录 */
    clear() {
      this.stack = []
      this.index = -1
    }
  }
})
