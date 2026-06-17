// 40-1.2 订单预付接口service/order
import { promise } from '@/utils/http'
import type { OrderPreResult } from '@/types/order'

// 预付订单接口
export const getMemberOrderPreAPI = () => {
  // 40-1.5.2 预付订单接口导入定义返回值类型
  return promise<OrderPreResult>({
    url: '/member/order/pre',
    method: 'GET',
  })
}

// 40-3.1 立即购买接口,接收商品skuId和count参数
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return promise({
    url: '/member/order/pre/now',
    method: 'GET',
    data,
  })
}
