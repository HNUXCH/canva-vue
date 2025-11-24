/**
 * Composables层-变换Composable
 * 功能：封装变换相关操作，简化View层对TransformService的调用
 * 服务对象：为View层提供简化的变换管理接口
 */
import { ref } from 'vue'

export function useTransform() {
  const transform = ref({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  })

  return {
    transform
  }
}
