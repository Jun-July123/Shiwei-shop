<template>
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
    <!-- 1.2 测试请求，点击按钮，触发getData事件 -->
    <button @tap="getData" size="mini" plain type="danger">测试请求</button>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { baseURL } from '@/utils/http'
const memberStore = useMemberStore()

// 1.3 getData，发送GET请求，获取banner数据
const getData = async () => {
  uni.request({
    url: '/home/banner',
    method: 'GET',
  })
}
</script>

<style lang="scss">
//
</style>
