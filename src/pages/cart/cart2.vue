<!-- 39-6.4 创建cart2.vue普通页，导入使用CartMain组件 -->
<script setup lang="ts">
import CartMain from '@/pages/cart/components/CartMain.vue'
// 39-6.7 底部安全区
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="cart-main" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <CartMain />
  </view>
</template>

<style scoped></style>
