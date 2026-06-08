<template>
  <!-- 12-1.3 使用自定义导航栏组件！ -->
  <CustomNavbar />

  <!-- 19-1.4 添加scroll-view组件，定义页面滚动范围 -->
  <!-- 包裹需滚动的内容组件，自定义导航栏不滚动，固定在顶部 -->
  <!-- 21-1.4 滚动组件标签，注册滚动事件scrolltolower -->
  <!-- 22-1.1 滚动组件定义refresh-enable，开启下拉刷新 -->
  <!-- 22-1.2 注册监听下拉刷新事件refresherrefresh -->
  <!-- 22-1.4 添加refresher-triggered，表示触发下拉刷新，开启刷新动画 -->
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefreshrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrollToLower"
    scroll-y
    class="scroll-view"
  >
    <!--  13-1.3 使用XtxSwiper轮播图组件 -->
    <!-- Xtx开头的组件会自动引入，不再需要手动引入 -->
    <!-- 15-2.4 定义轮播图list属性,，传递bannerList数据给XtxSwiper组件 -->
    <XtxSwiper :list="bannerList" />

    <!-- 16-1.2 index.vue导入使用前台分类组件 -->
    <!-- 17-2.1 前台分类组件标签，添加list属性，传递分类数据categoryList -->
    <CategoryPannel :list="categoryList" />

    <!-- 18-1.2 index.vue导入使用热门推荐组件 -->
    <!-- 18-2.5 热门推荐组件标签，添加list属性，传递热门推荐数据hotList -->
    <HotPannel :list="hotList" />

    <!-- 19-1.2 index.vue导入使用猜你喜欢组件 -->
    <!-- Xtx开头组件自动导入注册(在pages.json配置了) -->
    <!-- 21-1.1 猜你喜欢组件标签绑定ref -->
    <XtxGuess ref="guessRef" />
  </scroll-view>

  <view class="index">index</view>
</template>

<script setup lang="ts">
// 12-1.2 index.vue引入自定义导航栏组件
import CustomNavbar from './components/CustomNavbar.vue'
// 16-1.2 index.vue引入前台类目组件
import CategoryPannel from './components/CategoryPannel.vue'
// 18-1.2 index.vue引入热门推荐组件HotPannel
import HotPannel from './components/HotPannel.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { XtxGuessInstance } from '@/types/component.d'

// 15-1.4 index.vue引入首页banner接口
// 16-2.2 index.vue引入前台分类接口getHomeCategoryAPI
// 18-1.4 index.vue引入热门推荐接口getHomeHotAPI
import { getHomeHotAPI, getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'

// 18-2.3 index.vue引入热门推荐数据类型HotItem数组
// 17-1.4 index.vue引入前台分类数据类型
// 15-2.2.3 index.vue引入BannerItem类型
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'

// 15-2.2.4 定义接收到的bannerList数据类型为BannerItem数组
const bannerList = ref<BannerItem[]>([])
// 15-1.5 getHomeBannerData获取首页banner数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  // 15-2.3 获取到的banner数据，赋值bannerList数据
  bannerList.value = res.result
}

// 17-1.5 定义前台分类数据列表categoryList类型为CategoryItem数组
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  // 16-2.3 调用前台分类接口getHomeCategoryAPI获取分类数据
  const res = await getHomeCategoryAPI()
  // 17-1.6 获取到的分类数据，赋值categoryList数据
  categoryList.value = res.result
}

// 18-2.3 导入HotItem类型，定义热门推荐数据列表hotList类型为HotItem数组
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  // 18-1.4 引入调用getHomeHotAPI获取热门推荐数据
  const res = await getHomeHotAPI()
  // 18-2.4 获取到的热门推荐数据，赋值hotList数据
  hotList.value = res.result
}

// 18-1.5 onLoad页面一打开就调用getHomeHotData获取热门推荐数据
// 16-2.4 onLoad页面一打开就调用getHomeCategoryData获取前台分类数据
// 15-1.6 onLoad页面一打开就调用getHomeBannerData获取首页轮播图数据
onLoad(() => {
  getHomeHotData()
  getHomeBannerData()
  getHomeCategoryData()
})

// 21-1.3 获取猜你喜欢组件实例,类型为XtxGuessInstance
const guessRef = ref<XtxGuessInstance>()
// 21-1.6 滚动事件处理函数,调用XtxGuess暴露的getMore方法，获取更多数据
const onScrollToLower = () => {
  guessRef.value?.getMore()
}
// 22-1.5 定义isTriggered初始值为false，关闭刷新动画
const isTriggered = ref(false)
// 22-1.3 处理下拉刷新事件，重新获取轮播图、前台分类、热门推荐数据、猜你喜欢数据
const onRefreshrefresh = async () => {
  // 22-1.6 下拉刷新事件，开启刷新动画
  isTriggered.value = true
  // 加载数据
  // 22-1.8 Promise.all并行请求，等待所有请求完成
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  // 22-1.7 请求完成，加载数据之后，关闭刷新动画
  isTriggered.value = false
}
</script>

<style lang="scss">
/* 16-1.3 设置小程序页面page背景颜色 */
page {
  background-color: #f7f7f7;
  // 19-1.5 设置页面滚动高度
  // 19-1.5.1 页面内容（page不包含顶部底部导航栏高度）
  // 占满高度100%，flex布局，垂直排列
  height: 100%;
  display: flex;
  flex-direction: column;
}
// 19-1.5.2 scroll-view设置flex:1，占满page内容高度
// 页面滚动范围即为page内容高度
.scroll-view {
  flex: 1;
}
</style>
