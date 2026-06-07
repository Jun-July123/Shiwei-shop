<template>
  <!-- 12-1.3 使用自定义导航栏组件！ -->
  <CustomNavbar />

  <!--  13-1.3 使用XtxSwiper轮播图组件 -->
  <!-- Xtx开头的组件会自动引入，不再需要手动引入 -->
  <!-- 15-2.4 定义轮播图list属性,，传递bannerList数据给XtxSwiper组件 -->
  <XtxSwiper :list="bannerList" />

  <!-- 16-1.2 index.vue导入使用前台分类组件 -->
  <!-- 17-2.1 前台分类组件标签，添加list属性，传递分类数据categoryList -->
  <CategoryPannel :list="categoryList" />

  <!-- 18-1.2 index.vue导入使用热门推荐组件 -->
  <HotPannel />

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

// 15-1.4 index.vue引入首页banner接口
// 16-2.2 index.vue引入前台分类接口getHomeCategoryAPI
// 18-1.4 index.vue引入热门推荐接口getHomeHotAPI
import { getHomeHotAPI, getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'

// 15-2.2.3 index.vue引入BannerItem类型
// 17-1.4 index.vue引入前台分类数据类型
import type { BannerItem, CategoryItem } from '@/types/home'

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

const getHomeHotData = async () => {
  // 18-1.4 引入调用getHomeHotAPI获取热门推荐数据
  const res = await getHomeHotAPI()
  console.log(res)
}

// 18-1.5 onLoad页面一打开就调用getHomeHotData获取热门推荐数据
// 16-2.4 onLoad页面一打开就调用getHomeCategoryData获取前台分类数据
// 15-1.6 onLoad页面一打开就调用getHomeBannerData获取首页轮播图数据
onLoad(() => {
  getHomeHotData()
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<style lang="scss">
/* 16-1.3 设置小程序页面page背景颜色 */
page {
  background-color: #f7f7f7;
}
</style>
