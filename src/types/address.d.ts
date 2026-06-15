// 37-2.2 新建types/address.d.ts定义收货地址请求参数类型
export type AddressParams = {
  /** 收货人姓名 */
  receiver: string
  /** 联系方式 */
  contact: string
  /** 省份编码 */
  provinceCode: string
  /** 城市编码 */
  cityCode: string
  /** 区/县编码 */
  countyCode: string
  /** 详细地址 */
  address: string
  /** 默认地址，1为是，0为否 */
  isDefault: number
}

// 37-3.4 address.d.ts定义收获地址列表数据类型AddressItem
export type AddressItem = AddressParams & {
  /** 收货地址列表 */
  id: string
  fullLocation: string
}
