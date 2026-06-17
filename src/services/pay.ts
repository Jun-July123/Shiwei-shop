import { promise } from '@/utils/http'
// 41-4.1 封装微信支付接口service/pay，接收订单id参数
export const getPayWxPayMiniPayAPI = (data: { orderId: string }) => {
  // 41-4.2 定义微信支付返回值类型为WechatMiniprogram.RequestPaymentOption
  return promise<WechatMiniprogram.RequestPaymentOption>({
    url: '/pay/wxPay/miniPay',
    method: 'GET',
    data,
  })
}
// 41-4.8 封装模拟支付接口
export const getPayMockAPI = (data: { orderId: string }) => {
  return promise({
    url: '/pay/mock',
    method: 'GET',
    data,
  })
}
