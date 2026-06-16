// 38-5.2 创建service/cart.ts封装加入购物车接口，接收skuId和count参数
import { promise } from '@/utils/http'
import type { CartItem } from '@/types/cart.d'

export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return promise({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}

// 39-1.4 cart.ts封装获取购物车列表接口
export const getMemberCartAPI = () => {
  // 39-1.7.2 cart.ts导入购物车类型，定义购物车列表API返回值类型
  return promise<CartItem[]>({
    // @ts-ignore
    url: '/member/cart',
    method: 'GET',
  })
}

// 39-2.1 cart.ts封装删除购物车商品接口，接收ids参数
export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return promise({
    url: '/member/cart',
    method: 'DELETE',
    data,
  })
}

// 39-3.5 cart.ts封装更新购物车商品接口，接收skuId,商品选中状态selected和数量count参数
export const putMemberCartBySkuIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return promise({
    url: `/member/cart/${skuId}`,
    method: 'PUT',
    data,
  })
}
