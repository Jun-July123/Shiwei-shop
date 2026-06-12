// 32-1.2 创建login/login.ts登录服务
import { promise } from '@/utils/http'
import type { LoginResult } from '@/types/member'

// 32-1.3 定义登录请求参数类型
type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

// 32-1.4 定义导出登录服务接口postLoginWxMinAPI
export const postLoginWxMinAPI = (data: LoginParams) => {
  return promise<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

// 32-3.2 login.ts导入用户登录信息类型LoginResult，定义登录服务接口的返回值类型
// 32-2.1 定义导出模拟登录服务接口postLoginWxMiniSimpleAPI
export const postLoginWxMiniSimpleAPI = (phoneNumber: string) => {
  return promise<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: { phoneNumber },
  })
}
