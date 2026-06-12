// 33-2.4 创建composables/index.ts,封装导出猜你喜欢useGuessList函数
import { ref } from 'vue'
import type { XtxGuessInstance } from '@/types/component'

export const useGuessList = () => {
  // 33-2.1 定义绑定猜你喜欢实例，为XtxGuessInstance类型
  const guessRef = ref<XtxGuessInstance>()

  // 33-2.3 处理滚动事件,调用猜你喜欢实例的方法getMore,加载更多商品
  const onScrollToLower = () => {
    guessRef.value?.getMore()
  }

  // 33-2.5 return向外暴露猜你喜欢实例及滚动事件处理方法
  return {
    guessRef,
    onScrollToLower,
  }
}
