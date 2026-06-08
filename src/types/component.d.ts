/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    // 19-1.3 导入定义猜你喜欢组件类型类型src/types/component.d.ts
    XtxGuess: typeof XtxGuess
  }
}
