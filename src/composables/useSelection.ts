/**
 * Composables层-选择Composable
 * 功能：封装选择相关操作，简化View层对SelectionService的调用
 * 服务对象：为View层提供简化的选择管理接口
 */
import { ref } from 'vue'

export function useSelection() {
  const selectedElements = ref([])

  return {
    selectedElements
  }
}
