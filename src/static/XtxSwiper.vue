<template>
  <view class="carousel">
    <!-- 14-1.2 swiper添加change事件，设置轮播图指示点随着图片切换发生改变 -->
    <swiper @change="handleChange" :circular="true" :autoplay="true" :interval="3000">
      <!-- 15-2.6 遍历props.list，渲染轮播图图片 -->
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <!-- 14-1.1 当前图片对应的指示点高亮显示由activeIndex决定 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>
<!-- 13-1.1 创建src/components/XtxSwiper.vue通用轮播图组件 -->
<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'
// 15-2.5 定义props属性，接收父组件轮播图list数据
const props = defineProps<{
  list: BannerItem[]
}>()
console.log(props)
const activeIndex = ref(0)
// 14-1.3 处理轮播图图片change事件handleChange
// 通过UniHelper.SwiperOnchange设置handleChange类型
const handleChange: UniHelper.SwiperOnChange = (ev) => {
  // 14-1.4 更新activeIndex值，实现对应图片的指示点实现高亮
  // !非空断言，排除ev.detail为空值undefined的情况
  // activeIndex.value = ev.detail?.current
  activeIndex.value = ev.detail!.current
}
</script>

<style lang="scss">
.navbar {
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

    .main-title {
      font-size: 42rpx;
      font-weight: 500;
      color: #ffffff;
      letter-spacing: 6rpx;
      transform: translateY(-2rpx);
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
    color: #666;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
