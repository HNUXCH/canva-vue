import type { AnyElement } from '@/cores/types/element'
import { useHistoryStore } from '@/stores/history'

/**
 * Service层-历史服务
 * 功能：处理历史记录管理（操作记录、撤销、重做等）
 * 服务对象：为Composables层提供历史操作支持
 */
export class HistoryService {
  // lazy access to the pinia store to avoid calling useHistoryStore() at module load time
  private get store() {
    return useHistoryStore()
  }

  private get elementsStore() {
    return useElementsStore()
  }

  constructor() {}

  pushSnapshot(snapshot: AnyElement[]) {
    this.store.pushSnapshot(snapshot)
  }

  beginBatch() {
    this.store.beginBatch()
  }

  endBatch() {
    this.store.endBatch()
  }

  undo() {
    const result = this.store.undo()
    if (result && result.snapshot) {
      // 使用history中的snapshot更新elementsStore的状态
      this.elementsStore.elements = result.snapshot
    }
    return result
  }

  redo() {
    const result = this.store.redo()
    if (result && result.snapshot) {
      // 使用history中的snapshot更新elementsStore的状态
      this.elementsStore.elements = result.snapshot
    }
    return result
  }

  getCurrent(): AnyElement[] | null {
    return this.store.getCurrent()
  }

  canUndo(): boolean {
    return this.store.index > 0
  }

  canRedo(): boolean {
    return this.store.index < this.store.stack.length - 1
  }

  clear() {
    this.store.clear()
  }

  // Expose reactive store properties for consumers
  get stack(): AnyElement[][] {
    return this.store.stack
  }

  get index(): number {
    return this.store.index
  }
}

// singleton instance
export const historyService = new HistoryService()
export default historyService
