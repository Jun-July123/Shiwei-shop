// 32-1.2 创建login/login.ts登录服务
import { promise } from '@/utils/http'

// 32-1.3 定义登录请求参数类型
type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

// 32-1.4 定义导出登录服务接口postLoginWxMinAPI
export const postLoginWxMinAPI = (data: LoginParams) => {
  return promise({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}
