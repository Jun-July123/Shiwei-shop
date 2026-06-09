// 20-2.1 创建src/types/global.d.ts文件，
// 定义通用分页数据类型PageResult<T>，用于定义分页数据的类型
export type PageResult<T> = {
  items: T[]
  /** 列表数据 */
  counts: number /** 总条数 */
  page: number /** 当前页数 */
  pages: number /** 总页数 */
  pageSize: number /** 每页条数 */
}

// 21-2.1 global.d.ts定义导出分页参数类型
export type PageParams = {
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 10 */
  pageSize?: number
}

// 26-1.1 定义通用商品类型GoodsItem
import type { GuessItem } from '@/types/home'
export type GoodsItem = {
  desc: string /** 商品描述 */
  discount: number /** 商品折扣 */
  id: string /** id */
  name: string /** 商品名称 */
  orderNum: number /** 商品已下单数量 */
  picture: string /** 商品图片 */
  price: number /** 商品价格 */
}
