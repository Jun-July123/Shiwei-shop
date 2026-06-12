import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginResult } from '@/types/member'

// 1-1.1 stores/modules/member.ts定义会员仓库
export const useMemberStore = defineStore(
  'member',
  () => {
    // 32-3.3 store/modules/member.ts定义会员仓库保存清理会员信息的类型
    // 1-1.1.1 会员信息
    const profile = ref<LoginResult>()

    // 1-1.1.2 保存会员信息，会员信息重新赋值
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }
    // 1-1.1.3 清理会员信息，会员信息清空
    const clearProfile = () => {
      profile.value = undefined
    }

    // 1-1.1.4 return向外暴露会员信息及操作方法
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // 1-1.2 persist开启持久化存储小程序数据
  {
    // 网页端数据持久化存储
    // persist: true,
    // 小程序数据持久化存储
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          return uni.setStorageSync(key, value)
        },
      },
    },
  },
)
