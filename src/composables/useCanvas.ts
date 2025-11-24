/**
 * Composables层-画布Composable
 * 功能：封装画布相关操作，简化View层对CanvasService的调用
 * 服务对象：为View层提供简化的画布操作接口
 */
import { ref } from 'vue'

export function useCanvas() {
  const canvas = ref(null)

  return {
    canvas
  }
}
