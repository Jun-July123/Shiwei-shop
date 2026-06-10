// 30-1.4 新建services/goods.ts，封装商品详情页的接口
import { promise } from '@/utils/http'
import type { GoodsResult } from '@/types/goods'

// 30-1.5 定义导出商品详情页接口
export const getGoodsByIdAPI = (id: string) => {
  // 30-2.2 goods.ts定义商品详情请求接口类型为GoodsResult
  return promise<GoodsResult>({
    url: '/goods',
    method: 'GET',
    data: {
      id,
    },
  })
}
