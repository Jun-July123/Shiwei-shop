// 40-2.3 创建地址仓库stores/modules/address
import { defineStore } from 'pinia'
import type { AddressItem } from '@/types/address'
import { ref } from 'vue'

// 40-2.3.1 defineStore 定义地址仓库（选中的地址及切换选中的地址方法）
// 40-2.3.3 导出地址仓库
export const useAddressStore = defineStore('address', () => {
  const selectedAddress = ref<AddressItem>()
  const changeSelectedAddress = (address: AddressItem) => {
    selectedAddress.value = address
  }
  // 40-2.3.2 return 选中的地址及切换选中的地址方法
  return {
    selectedAddress,
    changeSelectedAddress,
  }
})
