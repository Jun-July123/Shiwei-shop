<!-- 13-1.1 创建src/components/XtxSwiper.vue通用轮播图组件 -->
<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'
// 15-2.5 XtxSwiper定义props，接收父组件轮播图list数据
const props = defineProps<{
  list: BannerItem[]
}>()
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
<template>
  <view class="carousel">
    <!-- 14-1.2 swiper添加change事件，设置轮播图指示点随着图片切换发生改变 -->
    <swiper @change="handleChange" :circular="true" :autoplay="true" :interval="3000">
      <!-- 15-2.6 渲染轮播图数据  -->
      <!-- 15-2.6.1 v-for渲染轮播图图片 -->
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <!-- 14-1.1 当前图片对应的指示点高亮显示由activeIndex决定 -->
    <!-- 15-2.6.2 渲染轮播图指示点 -->
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

<style lang="scss">
:host {
  display: block;
  height: 280rpx;
}
/* 轮播图 */
.carousel {
  height: 100%;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
