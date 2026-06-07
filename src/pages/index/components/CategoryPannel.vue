<!-- 16-1.1 创建前台类目组件src/pages/index/components/CategoryPannel.vue -->
<script setup lang="ts">
import type { CategoryItem } from '@/types/home'

// 17-2.2 定义props接收父组件传递的分类数据list（类型为CategoryItem数组）
const props = defineProps<{
  list: CategoryItem[]
}>()
</script>

<template>
  <view class="category">
    <!-- 17-2.3 v-for遍历渲染分类数据 -->
    <!-- prettier-ignore -->
    <navigator v-for="item in list" :key="item.id" class="category-item" hover-class="none" url="/pages/index/index">
      <image class="icon" :src="item.icon"></image>
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
/* 前台类目 */
.category {
  margin: 20rpx 0 0;
  padding: 10rpx 0;
  display: flex;
  flex-wrap: wrap;
  min-height: 328rpx;

  .category-item {
    width: 150rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 100rpx;
      height: 100rpx;
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>
