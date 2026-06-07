<!-- 12-1.1 创建src/pages/index/components/CustomNavbar.vue -->
<script setup lang="ts">
// 12-1.5 获取屏幕边界到安全区域的距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
</script>

<template>
  <!-- 12-1.6 定义导航栏的顶部内边距为安全区域顶部间距（记得添加px单位） -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo">
      <image class="logo-image" src="@/static/images/logo.png"></image>
      <text class="logo-text">新鲜 · 亲民 · 快捷</text>
    </view>
    <view class="search">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
    </view>
  </view>
</template>

<style lang="scss">
.navbar {
  background-image: url(@/static/images/navigator_bg.png);
  background-size: cover;
  padding-top: var(--status-bar-height); /* 关键：不被状态栏挡住 */
  display: flex;
  flex-direction: column;
  padding-bottom: 20rpx;

  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding: 20rpx 30rpx 0;

    .logo-image {
      width: 166rpx;
      height: 39rpx;
    }

    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin-left: 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 26rpx;
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: #fff;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
