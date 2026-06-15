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
