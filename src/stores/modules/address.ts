// 40-2.3 创建地址仓库stores/modules/address
import { defineStore } from 'pinia'
import type { AddressItem } from '@/types/address'
import { ref } from 'vue'

// 40-2.3.1 defineStore 定义地址仓库（选中的地址及切换选中的地址方法）
// 40-2.3.3 导出地址仓库
export const useAddressStore = defineStore('address', () => {
  const selectedAddress = ref<AddressItem>()

  // 43-2.1 stores/modules/address.ts 地址仓库定义新变量/方法
  // 43-2.1.1 定义全部地址列表addressList
  const addressList = ref<AddressItem[]>([])
  // 43-2.1.2 定义保存后端地址列表方法setAddressList，接收地址列表参数list
  const setAddressList = (list: AddressItem[]) => {
    addressList.value = list
    // 默认选中第一条
    if (list.length && !selectedAddress.value) {
      selectedAddress.value = list[0]
    }
  }

  // 43-2.1.3 定义切换选中的地址方法changeSelectedAddress，接收地址参数address
  const changeSelectedAddress = (address: AddressItem) => {
    selectedAddress.value = address
  }

  // 40-2.3.2 return 选中的地址及切换选中的地址方法
  return {
    selectedAddress,
    changeSelectedAddress,
    // 43-2.1.4 return导出地址列表及保存地址列表方法
    setAddressList,
    addressList,
  }
})
