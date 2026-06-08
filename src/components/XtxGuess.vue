<!-- 19-1.1 创建猜你喜欢组件src/components/XtxGuess.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { GuessItem } from '@/types/home'
import type { PageParams } from '@/types/global'
import { getHomeGoodsGuessLikeAPI } from '@/services/home'

// 21-2.3  XtxGuess.vue定义分页参数pageParams,
// 类型为Required<PageParams>，确保page和pageSize必填
const pageParams: Required<PageParams> = {
  page: 30,
  pageSize: 10,
}
// 21-3.1 定义接口获取结束标志finish，初始值为false
const finish = ref(false)
// 20-2.4 导入类型PageResult<GuessItem>
// 定义猜你喜欢数据列表guessList类型为GuessItem[]
// 猜你喜欢数据item类型为GuessItem
const guessList = ref<GuessItem[]>([])
// 20-1.2 XtxGuess.vue通用组件引入调用猜你喜欢接口，获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  // 21-3.4 调用接口获取数据前，判断finish是否为true
  // 如果为true，提示用户没有更多数据了
  if (finish.value) {
    return uni.showToast({
      title: '我也是有底线的哦~',
      icon: 'none',
    })
  }
  // 21-2.4 猜你喜欢接口，传递分页参数pageParams
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  // 20-2.5 获取到的猜你喜欢数据res.result.items，赋值给guessList
  // guessList.value = res.result.items
  // 21-2.5 数组追加，将获取到的猜你喜欢数据res.result.items，追加到guessList.value中
  guessList.value.push(...res.result.items)
  // 21-2.6 页码累加，每次调用接口，pageParams.page增加1
  // 21-3.2 分页条件判断，当前页数小于总页数，执行下一页数据获取
  if (pageParams.page < res.result.pages) {
    pageParams.page++
  }
  // 21-3.3 否则，将finish赋值为true，表示结束获取数据
  else {
    finish.value = true
  }
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
  <!-- 21-3.5 根据finish值，判断是否显示加载提示文字 -->
  <view class="loading-text"> {{ finish ? '没有更多数据啦~' : '正在加载...' }} </view>
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
