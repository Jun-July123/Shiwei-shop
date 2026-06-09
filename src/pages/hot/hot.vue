<!-- 25-1.1 创建src/pages/hot/hot.vue点击推荐选项切换推荐页面 -->
<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHotRecommendAPI } from '@/services/hot'
import type { SubTypeItem } from '@/types/hot'
// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

// 25-1.3 defineProps接收父组件HotPannel传递的type参数
const query = defineProps({
  type: {
    type: String,
    default: '1',
  },
})

// 25-1.4 根据type参数,查找当前点击的推荐选项
const currentMap = hotMap.find((item) => item.type === query.type)

// 25-1.5 动态设置标题
uni.setNavigationBarTitle({
  title: currentMap!.title,
})
// 26-2.1 推荐封面渲染
// 26-2.1.1 定义推荐封面bannerPicture
const bannerPicture = ref('')
// 26-2.2 推荐选项渲染
// 26-2.2.1 定义推荐选项subTypes，类型为SubTypeItem[]
const subTypes = ref<(SubTypeItem & { finish?: boolean })[]>([])
// 26-2.3 推荐选项Tab切换及商品渲染
// 26-3.1.1 定义推荐选项高亮下标,默认为0
const activeIndex = ref(0)

// 25-2.4 hot引入调用热门推荐接口，传递当前点击的推荐选项url，获取对应推荐数据
const getHotRecommendData = async () => {
  const res = await getHotRecommendAPI(currentMap!.url, {
    // 27-2.4 环境变量，开发环境，修改初始页面方便测试分页结束
    // 开发环境默认页面初始值为33，生产环境默认页面初始值为1
    page: import.meta.env.DEV ? 1 : 33,
    pageSize: 10,
  })
  // 26-2.1.2 获取推荐封面图并赋值
  bannerPicture.value = res.result.bannerPicture
  // 26-2.2.2 获取推荐选项并赋值
  subTypes.value = res.result.subTypes
}

// 25-2.6 页面加载时调用热门推荐接口，获取对应推荐数据
onLoad(() => {
  getHotRecommendData()
})

// 27-1.2 商品列表向下滚动事件，加载更多商品
const onScrollToLower = async () => {
  // 27-1.2.1 获取当前选项的商品列表
  const currSubTypes = subTypes.value[activeIndex.value]

  // 27-2.1 分页条件判断，当前页码小于总页数，页码累加
  if (currSubTypes.goodsItems.page < currSubTypes.goodsItems.pages) {
    // 27-1.2.2 当前页码累加
    currSubTypes.goodsItems.page++
  }
  // 27-2.2 否则标记分页结束，提示用户没有更多商品
  else {
    currSubTypes.finish = true
    return uni.showToast({
      title: '没有更多商品啦~',
      icon: 'none',
    })
  }

  // 27-1.2.3 调用热门推荐接口，获取分页商品数据
  // 传递当前选项的商品列表id、当前页码、每页商品数量
  const res = await getHotRecommendAPI(currentMap!.url, {
    subType: currSubTypes.id,
    page: currSubTypes.goodsItems.page,
    pageSize: currSubTypes.goodsItems.pageSize,
  })

  // 27-1.3 获取新的列表选项
  const newSubTypes = res.result.subTypes[activeIndex.value]
  // 27-1.4 将新的商品列表合并到当前选项商品列表中
  currSubTypes.goodsItems.items.push(...newSubTypes.goodsItems.items)
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <!-- 26-2.1.3 :src动态渲染推荐封面图 -->
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <!-- 26-2.2.3 v-for动态渲染推荐选项 -->
      <!-- 26-3.3.2 动态添加active类，由activeIndex控制选项高亮-->
      <!-- 26-3.3.3 点击对应选项，赋值activeIndex切换推荐选项 -->
      <text
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 26-2.4 v-for动态渲染推荐商品 -->
    <!-- 26-2.5 v-show根据activeIndex控制对应推荐列表显示隐藏，实现列表切换 -->
    <!-- 27-1.1 监听商品列表向下滚动事件 -->
    <scroll-view
      @scrolltolower="onScrollToLower"
      v-for="(item, index) in subTypes"
      :key="item.id"
      v-show="activeIndex === index"
      scroll-y
      class="scroll-view"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <!-- 27-2.3 根据分页状态finish判断分页加载提示 -->
      <view class="loading-text">{{ item.finish ? '我也是有界限的哦~' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
