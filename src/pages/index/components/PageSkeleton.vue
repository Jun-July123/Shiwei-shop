<!-- 24-1.1 微信开发者工具生成骨架屏index.skeleton.wxml及index.skeleton.wxss -->
<!-- 24-1.2 创建骨架屏组件src/pages/index/components/PageSkeleton.vue -->
<!-- 24-1.3 在index.skeleton.wxml拷贝保留需要生成骨架屏的内容结构 -->
<template name="skeleton">
  <view is="components/XtxSwiper">
    <view class="carousel XtxSwiper--carousel">
      <!-- 24-1.4 解决类型错误,把属性变成动态属性 -->
      <swiper :autoplay="false" :circular="true" :interval="3000" :current="0"></swiper>
      <view class="indicator XtxSwiper--indicator">
        <text class="dot XtxSwiper--dot"></text>
        <text class="dot XtxSwiper--dot"></text>
        <text class="dot XtxSwiper--dot"></text>
        <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
        <text class="dot XtxSwiper--dot"></text>
      </view>
    </view>
  </view>
  <view is="pages/index/components/CategoryPannel">
    <view class="category CategoryPannel--category">
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-959 sk-text"
          >居家</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-105 sk-text"
          >锦鲤</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-947 sk-text"
          >服饰</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-948 sk-text"
          >母婴</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-296 sk-text"
          >个护</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-786 sk-text"
          >严选</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-245 sk-text"
          >数码</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-13 sk-text"
          >运动</text
        >
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-3 sk-text">杂项</text>
      </navigator>
      <navigator class="category-item CategoryPannel--category-item" hover-class="none">
        <image class="icon CategoryPannel--icon sk-image"></image>
        <text class="text CategoryPannel--text sk-transparent sk-text-14-2857-326 sk-text"
          >品牌</text
        >
      </navigator>
    </view>
  </view>
  <view is="pages/index/components/HotPannel">
    <view class="panel HotPannel--panel hot HotPannel--hot">
      <view class="item HotPannel--item">
        <view class="title HotPannel--title">
          <text class="title-text HotPannel--title-text sk-transparent sk-text-14-2857-843 sk-text"
            >特惠推荐</text
          >
          <text class="title-desc HotPannel--title-desc sk-transparent sk-text-14-2857-428 sk-text"
            >精选全攻略</text
          >
        </view>
        <navigator class="cards HotPannel--cards" hover-class="none">
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPannel--item">
        <view class="title HotPannel--title">
          <text class="title-text HotPannel--title-text sk-transparent sk-text-14-2857-882 sk-text"
            >爆款推荐</text
          >
          <text class="title-desc HotPannel--title-desc sk-transparent sk-text-14-2857-267 sk-text"
            >最受欢迎</text
          >
        </view>
        <navigator class="cards HotPannel--cards" hover-class="none">
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPannel--item">
        <view class="title HotPannel--title">
          <text class="title-text HotPannel--title-text sk-transparent sk-text-14-2857-752 sk-text"
            >一站买全</text
          >
          <text class="title-desc HotPannel--title-desc sk-transparent sk-text-14-2857-410 sk-text"
            >精心优选</text
          >
        </view>
        <navigator class="cards HotPannel--cards" hover-class="none">
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPannel--item">
        <view class="title HotPannel--title">
          <text class="title-text HotPannel--title-text sk-transparent sk-text-14-2857-365 sk-text"
            >新鲜好物</text
          >
          <text class="title-desc HotPannel--title-desc sk-transparent sk-text-14-2857-402 sk-text"
            >生活加分项</text
          >
        </view>
        <navigator class="cards HotPannel--cards" hover-class="none">
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPannel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
    </view>
  </view>
</template>
<!-- 24-1.5 在index.skeleton.wxss拷贝保留需要生成骨架屏的内容样式 -->
<style>
.sk-transparent {
  color: transparent !important;
}
.sk-text-0-0000-646 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-910 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-959 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-105 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-947 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-948 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-296 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-786 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-245 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-13 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-3 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-326 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}
.sk-text-14-2857-843 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 42.6563rpx;
  position: relative !important;
}
.sk-text-14-2857-428 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-14-2857-882 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 42.6563rpx;
  position: relative !important;
}
.sk-text-14-2857-267 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-14-2857-752 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 42.6563rpx;
  position: relative !important;
}
.sk-text-14-2857-410 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-14-2857-365 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 42.6563rpx;
  position: relative !important;
}
.sk-text-14-2857-402 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}
.sk-text-14-2857-683 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
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
  background-color: transparent;
}
</style>
