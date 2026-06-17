<!-- 39-6.4 创建cart2.vue普通页，导入使用CartMain组件 -->
<script setup lang="ts">
import CartMain from '@/pages/cart/components/CartMain.vue'
import { ref, onMounted } from 'vue'

const safeBottom = ref(0)
onMounted(() => {
  const sysInfo = uni.getSystemInfoSync()
  safeBottom.value = sysInfo.safeAreaInsets?.bottom ?? 0
})
</script>

<template>
  <view class="cart-main">
    <!-- 增加 .value -->
    <CartMain :safe-bottom="safeBottom" />
  </view>
</template>

<style scoped>
.cart-main {
  height: 100vh;
}
</style>
