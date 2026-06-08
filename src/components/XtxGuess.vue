<!-- 19-1.1 创建猜你喜欢组件src/components/XtxGuess.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { GuessItem } from '@/types/home'

import { getHomeGoodsGuessLikeAPI } from '@/services/home'

// 20-2.4 导入类型PageResult<GuessItem>
// 定义猜你喜欢数据列表guessList类型为GuessItem[]
// 猜你喜欢数据item类型为GuessItem
const guessList = ref<GuessItem[]>([])
// 20-1.2 XtxGuess.vue通用组件引入调用猜你喜欢接口，获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  const res = await getHomeGoodsGuessLikeAPI()
  // 20-2.5 获取到的猜你喜欢数据res.result.items，赋值给guessList
  guessList.value = res.result.items
}

// 20-1.3 组件挂载完毕，获取猜你喜欢数据
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

// 21-1.5 XtxGuess.vue暴露方法defineExpose，暴露猜你喜欢数据
defineExpose({
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <!-- 20-2.6 v-for遍历渲染猜你喜欢数据列表 -->
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name"> {{ item.name }} </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text"> 正在加载... </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
