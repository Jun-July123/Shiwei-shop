// 15-2.1 创建src/types/home.d.ts文件，设置首页数据的类型
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

// 17-1.1 home.d.ts定义前台分类数据类型
export type CategoryItem = {
  /** id */
  id: string
  name: string
  /** 图片链接 */
  icon: string
}

// 18-2.1 home.d.ts定义热门推荐数据类型
export type HotItem = {
  alt: string /** 说明 */
  id: string /** id */
  pictures: string[] /** 图片集合[ 图片路径 ] */
  target: string /** 跳转地址 */
  title: string /** 标题 */
  type: string /** 推荐类型 */
}

// 26-1.2 home.d.ts重新定义猜你喜欢商品类型
// 猜你喜欢商品类型与通用商品一致，导入GoodsItem类型，实现类型复用
import { GoodsItem } from './global'
// 20-2.2 home.d.ts定义猜你喜欢数据类型
export type GuessItem = GoodsItem
// {
//   desc: string /** 商品描述 */
//   discount: number /** 商品折扣 */
//   id: string /** id */
//   name: string /** 商品名称 */
//   orderNum: number /** 商品已下单数量 */
//   picture: string /** 商品图片 */
//   price: number /** 商品价格 */
// }
