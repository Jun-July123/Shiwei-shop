import type { AddressParams } from '@/types/address'
import { promise } from '@/utils/http'
import type { AddressItem } from '@/types/address'

/** @param data 请求参数*/
// 37-2.1 创建service/address.ts封装地址接口
// 37-2.3 收货地址接口，导入配置请求参数数据类型
export const postMemberAddressAPI = (data: AddressParams) => {
  return promise({ method: 'POST', url: '/member/address', data })
}

// 37-3.1 address.ts 封装收获地址列表接口
export const getMemberAddressListAPI = () => {
  return promise<AddressItem[]>({ url: '/member/address', method: 'GET' })
}

// 37-4.1 address.ts 封装收货地址详情接口
export const getMemberAddressDetailAPI = (id: string) => {
  // 37-4.2 接口返回类型为AddressItem
  return promise<AddressItem>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}

// 37-5.1 address.ts 封装修改地址接口(接收id和请求参数表单数据)
export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return promise({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

// 37-7.5 封装删除地址接口(接收地址id)
export const deleteMemberAddressAPI = (id: string) => {
  return promise({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
