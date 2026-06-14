//  35-2.1 创建profile.ts个人信息接口
// import type { ProfileDetail } from '@/types/member'
import { promise } from '@/utils/http'
import type { ProfileDetail } from '@/types/member'
import type { ProfileParams } from '@/types/member'
export const getMemberProfileAPI = () => {
  // 35-2.5 profile.ts导入使用个人信息类型，定义请求返回类型
  return promise<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}

// 36-2.1 profile.ts 定义修改个人信息接口
// 36-2.3 profile.ts 导入使用修改个人信息参数类型
export const putMemberProfileAPI = (data: ProfileParams) => {
  return promise({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
