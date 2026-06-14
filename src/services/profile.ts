//  35-2.1 创建profile.ts个人信息接口
// import type { ProfileDetail } from '@/types/member'
import { promise } from '@/utils/http'
import type { ProfileDetail } from '@/types/member'

export const getMemberProfileAPI = () => {
  // 35-2.5 profile.ts导入使用个人信息类型，定义请求返回类型
  return promise<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}
