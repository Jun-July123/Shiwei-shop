// 28-2.1 创建src/services/category.ts文件，设置分类接口
// 28-2.2 导入http模块的promise函数，用于发送请求
import { promise } from '@/utils/http'
import type { CategoryTopItem } from '@/types/category'

// 28-2.3 定义导出一级分类列表的API函数
export const getCategoryTopAPI = () => {
  // 28-3.2 category.ts导入分类类型，定义一级分类请求返回类型CategoryTopItem[]
  return promise<CategoryTopItem[]>({
    url: '/category/top',
    method: 'GET',
  })
}
