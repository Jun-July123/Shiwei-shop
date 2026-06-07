<template>
  <!-- @ts-nocheck -->
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="memberStore.setProfile({ nickname: '黑马先锋', token: '123456' })"
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData" size="mini" plain type="primary">测试请求</button>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { baseURL, promise } from '@/utils/http'
const memberStore = useMemberStore()

const getData = async () => {
  const res = await promise({
    url: '/home/banner',
    method: 'GET',
  })
  console.log(res)
}
</script>

<style lang="scss">
//
</style>
