// 15-1.1 创建src/services/home.ts文件，设置首页banner接口
// 15-1.2 导入http模块的promise函数，用于发送请求
import { promise } from '@/utils/http'

/**
 * @param distributionSite 广告区域展示位置
 * （1：首页banner，2：首页商品列表），默认首页1
 */
// 15-2.2 确保获取到的banner数据类型为BannerItem类型
// 15-2.2.1 home.ts导入BannerItem类型
import type { BannerItem } from '@/types/home'

// 15-1.3 定义获取轮播图接口的函数getHomeBannerAPI，
// 传递distributionSite参数，默认值为1
export const getHomeBannerAPI = (distributionSite = 1) => {
  // 15-2.2.2 定义promise请求的类型为BannerItem数组
  return promise<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: { distributionSite },
  })
}
