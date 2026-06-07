// 13-1.4 创建components/components.d.ts文件，设置Xt全局组件的类型
// 13-1.4.1 导入全局XtxSwiper组件
import XtxSwiper from './XtxSwiper.vue'
// 13-1.4.2 定义XtxSwiper组件的类型为导入的XtxSwiper类型
// 而不再是由于自动导入导致的unknown类型
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}
