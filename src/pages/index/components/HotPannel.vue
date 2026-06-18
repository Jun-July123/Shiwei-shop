<!-- 18-1.1 创建热门推荐组件src/pages/index/components/HotPannel.vue -->
<script setup lang="ts">
// 18-2.6 定义props接收父组件传递的热门推荐数据list（类型为HotItem数组）
import type { HotItem } from '@/types/home'
const props = defineProps<{
  list: HotItem[]
}>()
</script>

<template>
  <!-- 推荐专区 -->
  <view class="panel hot">
    <!-- 18-2.7 v-for遍历渲染热门推荐数据 -->
    <view class="item" v-for="item in list" :key="item.id">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <!-- 25-1.2 热门推荐动态绑定type参数,传递给子组件Hot,点击跳转对应推荐页面 -->
      <navigator hover-class="none" :url="`/pages/hot/hot?type=${item.type}`" class="cards">
        <!-- 18-2.8 v-for遍历渲染热门推荐图片 -->
        <image
          v-for="src in item.pictures"
          :key="src"
          :src="src"
          class="image"
          mode="aspectFit"
        ></image>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
/* 热门推荐 */
.hot {
  display: flex;
  flex-wrap: wrap;
  min-height: 508rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 16rpx;
  background-color: #fff5f8;

  box-shadow: 0 2rpx 10rpx rgba(255, 122, 156, 0.08);

  .title {
    display: flex;
    align-items: center;
    padding: 24rpx 24rpx 0;
    font-size: 32rpx;
    color: #333;
    position: relative;
    .title-desc {
      font-size: 24rpx;
      color: #999;
      margin-left: 18rpx;
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 254rpx;
    border-right: 1rpx solid #ffe0e8;
    border-top: 1rpx solid #ffe0e8;
    .title {
      justify-content: start;
    }
    &:nth-child(2n) {
      border-right: 0 none;
    }
    &:nth-child(-n + 2) {
      border-top: 0 none;
    }
    .image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 10rpx;
    }
  }
  .cards {
    flex: 1;
    padding: 15rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
