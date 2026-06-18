<!-- 29-2.1 微信开发者工具生成骨架屏category.skeleton.wxml及category.skeleton.scss -->
<!-- 29-2.2 新建骨架屏组件category/components/PageSkeleton.vue -->
<!-- 29-2.3 导入骨架屏架构及样式category.skeleton.wxml及scss -->
<template name="skeleton">
  <view class="sk-container">
    <view class="viewport viewport">
      <view class="search search">
        <view class="input input">
          <text
            class="icon-search sk-transparent sk-text-14-2857-49 sk-text sk-pseudo sk-pseudo-circle"
            >女靴</text
          >
        </view>
      </view>
      <view class="categories categories">
        <scroll-view :scroll-y="true" class="primary primary">
          <view class="item active sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-592 sk-text">居家</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-431 sk-text">美食</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-407 sk-text">服饰</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-114 sk-text">母婴</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-732 sk-text">个护</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-605 sk-text">严选</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-555 sk-text">数码</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-418 sk-text">运动</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-960 sk-text">杂项</text>
          </view>
        </scroll-view>
        <scroll-view :scroll-y="true" class="secondary secondary">
          <view is="components/XtxSwiper" class="banner banner">
            <view class="carousel XtxSwiper--carousel">
              <swiper :autoplay="false" :circular="true" :interval="3000" :current="0"></swiper>
              <view class="indicator XtxSwiper--indicator">
                <text class="dot XtxSwiper--dot"></text>
                <text class="dot XtxSwiper--dot"></text>
                <text class="dot XtxSwiper--dot"></text>
                <text class="dot XtxSwiper--dot"></text>
                <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
              </view>
            </view>
          </view>
          <view class="panel panel">
            <view class="title title">
              <text class="name sk-transparent sk-text-28-0000-853 sk-text">居家生活用品</text>
              <navigator
                class="more sk-transparent sk-text-30-0000-132 sk-text sk-pseudo sk-pseudo-circle"
                hover-class="none"
                >全部</navigator
              >
            </view>
            <view class="section section">
              <navigator class="goods goods" hover-class="none">
                <image class="image sk-image"></image>
                <view class="name ellipsis sk-transparent sk-text-14-2857-260 sk-text"
                  >钻石陶瓷涂层多用锅18cm 小奶锅</view
                >
                <view class="price price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="number sk-transparent sk-text-14-2857-354 sk-text">149.00</text>
                </view>
              </navigator>
              <navigator class="goods goods" hover-class="none">
                <image class="image sk-image"></image>
                <view class="name ellipsis sk-transparent sk-text-14-2857-966 sk-text"
                  >极光限定 珠光蓝珐琅锅</view
                >
                <view class="price price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="number sk-transparent sk-text-14-2857-888 sk-text">199.00</text>
                </view>
              </navigator>
            </view>
          </view>
          <view class="panel panel">
            <view class="title title">
              <text class="name sk-transparent sk-text-28-0000-684 sk-text">收纳</text>
              <navigator
                class="more sk-transparent sk-text-30-0000-772 sk-text sk-pseudo sk-pseudo-circle"
                hover-class="none"
                >全部</navigator
              >
            </view>
            <view class="section section">
              <navigator class="goods goods" hover-class="none">
                <image class="image sk-image"></image>
                <view class="name ellipsis sk-transparent sk-text-14-2857-104 sk-text"
                  >给衣柜减减肥，真空防潮压缩袋</view
                >
                <view class="price price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="number sk-transparent sk-text-14-2857-442 sk-text">79.00</text>
                </view>
              </navigator>
              <navigator class="goods goods" hover-class="none">
                <image class="image sk-image"></image>
                <view class="name ellipsis sk-transparent sk-text-14-2857-885 sk-text"
                  >爆款明星好物，抽屉式透明储物柜</view
                >
                <view class="price price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="number sk-transparent sk-text-14-2857-228 sk-text">129.00</text>
                </view>
              </navigator>
              <navigator class="goods goods" hover-class="none">
                <image class="image sk-image"></image>
                <view class="name ellipsis sk-transparent sk-text-14-2857-895 sk-text"
                  >衣柜省空间神器，棉麻涤·收纳挂袋</view
                >
                <view class="price price">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="number sk-transparent sk-text-14-2857-270 sk-text">55.00</text>
                </view>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-49 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-592 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-431 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-407 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-114 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-732 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-605 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-555 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-418 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-960 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-28-0000-853 {
  background-image: linear-gradient(
    transparent 28%,
    #ffe8ef 0%,
    #ffe8ef 72%,
    transparent 0%
  ) !important;
  background-size: 100% 58.5938rpx;
  position: relative !important;
}
.sk-text-30-0000-132 {
  background-image: linear-gradient(
    transparent 30%,
    #ffe8ef 0%,
    #ffe8ef 70%,
    transparent 0%
  ) !important;
  background-size: 100% 58.5938rpx;
  position: relative !important;
}
.sk-text-14-2857-260 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.5313rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-354 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-14-2857-966 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.5313rpx;
  position: relative !important;
}
.sk-text-14-2857-888 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-28-0000-684 {
  background-image: linear-gradient(
    transparent 28%,
    #ffe8ef 0%,
    #ffe8ef 72%,
    transparent 0%
  ) !important;
  background-size: 100% 58.5938rpx;
  position: relative !important;
}
.sk-text-30-0000-772 {
  background-image: linear-gradient(
    transparent 30%,
    #ffe8ef 0%,
    #ffe8ef 70%,
    transparent 0%
  ) !important;
  background-size: 100% 58.5938rpx;
  position: relative !important;
}
.sk-text-14-2857-104 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.5313rpx;
  position: relative !important;
}
.sk-text-14-2857-442 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-14-2857-885 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.5313rpx;
  position: relative !important;
}
.sk-text-14-2857-228 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-14-2857-895 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.5313rpx;
  position: relative !important;
}
.sk-text-14-2857-270 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #ffe8ef 0%,
    #ffe8ef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-image {
  background: #fff0f5 !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #ffe8ef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff5f8;
}
</style>
