<script setup lang="ts">
// 获取屏幕安全区域，适配异形屏手机
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo">
      <text class="main-title">拾味生活</text>
      <text class="logo-text">品质好物 · 实惠优选</text>
    </view>
    <view class="search">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
    </view>
  </view>
</template>

<style lang="scss">
.navbar {
  /* 改用主题粉色纯色背景，替代背景图，风格更统一 */
  background-color: #ff9ebb;
  background-size: cover;
  padding-top: var(--status-bar-height);
  display: flex;
  flex-direction: column;
  padding-bottom: 20rpx;

  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding: 20rpx 30rpx 0;

    // .main-title {
    //   font-size: 42rpx;
    //   font-weight: 500;
    //   color: #ffffff;
    //   letter-spacing: 6rpx;
    //   transform: translateY(-2rpx);
    // }

    // .logo-text {
    //   flex: 1;
    //   line-height: 28rpx;
    //   color: #fff;
    //   margin-left: 20rpx;
    //   padding-left: 20rpx;
    //   border-left: 1rpx solid #fff;
    //   font-size: 26rpx;
    //   letter-spacing: 2rpx;
    // }
    .main-title {
      font-size: 40rpx;
      font-weight: bold;
      color: #ffffff;
      letter-spacing: 4rpx;
    }

    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin-left: 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 26rpx;
      letter-spacing: 2rpx;
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    /* 搜索框文字改为深灰，提升辨识度 */
    color: #666;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
