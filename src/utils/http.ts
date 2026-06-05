// 1.1 创建utils/http.ts，配置请求相关信息
// 1.2 配置baseURL请求基地址
const baseURL = 'https://pcapoi-xiaotuxian-front-devtest.itheima.net'
import { useMemberStore } from '@/stores/modules/member'
// 1.3 请求拦截器httpInterceptor
const httpInterceptor = {
  // 1.4 invoke 拦截前触发,请求配置参数对象options类型为UniApp.RequestOptions
  invoke(options: UniApp.RequestOptions) {
    // 1.4.1 判断url是否为非http开头，拼接baseURL基地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 1.4.2 设置请求超时时间（默认60s）
    options.timeout = 10000
    console.log(options)

    // 1.4.3 请求头设置
    options.header = {
      ...options.header, //保留原来的请求头
      'source-client': 'miniapp', //添加小程序请求头
    }
    // 1.4.4 添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token || undefined
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
