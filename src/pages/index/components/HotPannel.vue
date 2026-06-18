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
// 44-2.3.2 HotPannel.vue引入热门推荐组件样式styles/HotPannel.scss中
@import './styles/HotPannel.scss';
</style>
