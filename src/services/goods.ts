// 30-1.4 新建services/goods.ts，封装商品详情页的接口
import { promise } from '@/utils/http'

// 30-1.5 定义导出商品详情页接口
export const getGoodsByIdAPI = (id: string) => {
  return promise({
    url: '/goods',
    method: 'GET',
    data: {
      id,
    },
  })
}
