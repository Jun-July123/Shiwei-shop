// 1.1 创建utils/http.ts，配置请求相关信息
// 1.2 配置baseURL请求基地址
const baseURL = 'https://pcapoi-xiaotuxian-front-devtest.itheima.net'
import { useMemberStore } from '@/stores/modules/member'
const memberStore = useMemberStore()
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

interface Data<T> {
  code: number
  msg: string
  data: T
}

const promise = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        // 1.1 如果res.statusCode为200-300，成功返回数据res.data
        if (res.statusCode === 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        }
        // 1.2 401,登录过期，清理会员信息，重新登录
        else if (res.statusCode === 401) {
          // 1.2.1 调用会员仓库，清理会员信息
          memberStore.clearProfile()
          // 1.2.2 uni.navigateTo，跳转到重新登录页面
          uni.navigateTo({
            url: '/pages/login/login',
          })
          uni.showToast({
            icon: 'none',
            title: '登录过期，请重新登录',
          })
          // 1.2.3 reject，阻止后续请求
          reject(res.data as Data<T>)
        } else {
          // 1.3 其它状态码，提示用户请求失败
          uni.showToast({
            icon: 'none',
            // 1.3.1 res.data有两种类型，Data<T>和string，需要判断类型
            title: (res.data as Data<T>).msg || '请求失败',
          })
          // 1.3.2 reject，阻止后续请求
          reject(res.data as Data<T>)
        }
      },
      // 1.4 请求失败，提示用户请求失败
      fail(err) {
        // 1.4.1 提示用户请求失败
        uni.showToast({
          icon: 'none',
          title: err.errMsg || '请求失败,请稍后重试...',
        })
        // 1.4.2 reject，阻止后续请求 ，并传递错误信息err
        reject(err)
      },
    })
  })
}
