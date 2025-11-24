/**
 * Composables层-元素Composable
 * 功能：封装元素相关操作，简化View层对ElementService的调用
 * 服务对象：为View层提供简化的元素管理接口
 */
import { ref } from 'vue'

export function useElements() {
  const elements = ref([])

  return {
    elements
  }
}
