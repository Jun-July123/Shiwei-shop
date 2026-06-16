// 38-5.2 创建service/cart.ts封装加入购物车接口，接收skuId和count参数
import { promise } from '@/utils/http'

export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return promise({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}
