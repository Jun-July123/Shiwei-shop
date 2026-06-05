<template>
  <view class="my">
    <!-- 1-1.4 会员信息 -->
    <view>会员信息：{{ memberStore.profile }}</view>
    <!-- 1-1.4 点击保存用户信息，调用会员仓库的setProfile方法，保存用户信息到会员仓库 -->
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <!-- 1-1.5 点击清理用户信息，调用会员仓库的clearProfile方法，清理用户信息 -->
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
  </view>
</template>

<script setup lang="ts">
// 1-1.3 my.vue导入会员仓库，创建会员仓库实例
import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()
</script>

<style lang="scss">
//
</style>
