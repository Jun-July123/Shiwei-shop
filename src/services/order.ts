// 40-1.2 订单预付接口service/order
import { promise } from '@/utils/http'
import type {
  OrderPreResult,
  OrderCreateParams,
  OrderResult,
  OrderLogisticResult,
  OrderListParams,
  OrderListResult,
  OrderItem,
} from '@/types/order'

// 预付订单接口
export const getMemberOrderPreAPI = () => {
  // 40-1.5.2 预付订单接口导入定义返回值类型
  return promise<OrderPreResult>({
    url: '/member/order/pre',
    method: 'GET',
  })
}

// 40-3.1 立即购买接口,接收商品skuId和count参数
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return promise({
    url: '/member/order/pre/now',
    method: 'GET',
    data,
  })
}

// 40-4.1 order.ts封装提交订单接口
// 40-4.3 定义订单提交接口请求参数类型OrderCreateParams
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  // 40-4.6 定义提交订单接口，返回值的id为string类型
  return promise<{ id: string }>({
    url: '/member/order',
    method: 'POST',
    data,
  })
}

// 41-2.1 order.ts封装获取订单详情接口，接收订单id参数
export const getMemberOrderByIdAPI = (id: string) => {
  // 41-2.4.2 order.ts定义获取订单详情接口返回值类型为OrderResult类型
  return promise<OrderResult>({
    url: '/member/order/' + id,
    method: 'GET',
  })
}

// 41-5.1 order.ts封装模拟发货接口
export const getMemberOrderConsignmentByIdAPI = (data: { id: string }) => {
  return promise({
    url: `/member/order/consignment/${data.id}`,
    method: 'GET',
    data,
  })
}

// 41-6.1 order.ts封装确认收货接口，接收订单id参数，返回值类型为OrderResult
export const putMemberOrderReceiptByIdAPI = (data: { id: string }) => {
  return promise<OrderResult>({
    url: `/member/order/${data.id}/receipt`,
    method: 'PUT',
    data,
  })
}

// 41-7.1 order.ts封装获取物流信息接口，接收订单id参数
export const getMemberOrderLogisticsByIdAPI = (id: string) => {
  // 41-7.3 定义获取物流信息接口返回值类型为OrderLogisticResult
  return promise<OrderLogisticResult>({
    url: `/member/order/${id}/logistics`,
    method: 'GET',
  })
}

// 41-8.1 order.ts封装订单删除接口，接收订单id参数
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
  return promise({
    url: `/member/order`,
    method: 'DELETE',
    data,
  })
}

// 42-3.5 order.ts封装获取订单列表接口，接收订单状态参数
export const getMemberOrderAPI = (data: OrderListParams) => {
  // 42-3.6.2 order.ts定义获取订单列表接口类型
  // 接收的参数为OrderListParams，请求返回值类型为OrderListResult
  return promise<OrderListResult>({
    method: 'GET',
    url: `/member/order`,
    data,
  })
}
