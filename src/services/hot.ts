// 25-2.1 创建热门推荐接口src/services/hot.ts
import { promise } from '@/utils/http'

// 25-2.2 引入分页数据类型,同时定义热门推荐参数类型
// 热门推荐参数包含分页参数和subType参数
import type { PageParams } from '@/types/global'
type HotParams = PageParams & { subType?: string }

// 25-2.3 定义导出热门推荐接口（url请求地址，data请求参数（可选））
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return promise({
    method: 'GET',
    url,
    data,
  })
}
