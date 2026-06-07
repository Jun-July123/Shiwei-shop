<script setup lang="ts">
// 12-1.2 index.vue引入自定义导航栏组件
import CustomNavbar from './components/CustomNavbar.vue'
</script>

<template>
  <!-- 12-1.3 使用自定义导航栏组件！ -->
  <CustomNavbar />
  <!--  13-1.3 使用XtxSwiper轮播图组件 -->
  <!-- Xtx开头的组件会自动引入，不再需要手动引入 -->
  <XtxSwiper />
  <view class="index">index</view>
</template>

<style lang="scss"></style>
