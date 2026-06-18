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
// 44-2.2.2 CategoryPannel.vue引入前台类目组件样式styles/CategoryPannel.scss中
@import './styles/CategoryPannel.scss';
</style>
