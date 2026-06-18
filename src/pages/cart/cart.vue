<!-- 39-6.3 重新构造cart.vue，导入使用CartMain组件 -->
<script setup lang="ts">
import CartMain from '@/pages/cart/components/CartMain.vue'
</script>

<template>
  <view class="cart-main">
    <CartMain />
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  // 视口不能设置固定高度，否则滑动达到一定高度，无法容纳更多数据
  // height: 100vh;
}
</style>
