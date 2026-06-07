<template>
  <!-- 12-1.3 使用自定义导航栏组件！ -->
  <CustomNavbar />
  <!--  13-1.3 使用XtxSwiper轮播图组件 -->
  <!-- Xtx开头的组件会自动引入，不再需要手动引入 -->
  <!-- 15-2.4 定义轮播图list属性,，传递bannerList数据给XtxSwiper组件 -->
  <XtxSwiper :list="bannerList" />
  <!-- 16-1.2 index.vue导入使用前台分类组件 -->
  <CategoryPannel />
  <view class="index">index</view>
</template>
<script setup lang="ts">
// 16-1.2 index.vue引入前台类目组件
import CategoryPannel from './components/CategoryPannel.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 12-1.2 index.vue引入自定义导航栏组件
import CustomNavbar from './components/CustomNavbar.vue'
// 15-2.2.3 index.vue引入BannerItem类型
import type { BannerItem } from '@/types/home'
// 15-1.4 index.vue引入首页banner接口
// 16-2.2 index.vue引入前台分类接口getHomeCategoryAPI
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'

// 15-2.2.4 定义接收到的bannerList数据类型为BannerItem数组
const bannerList = ref<BannerItem[]>([])
// 15-1.5 getHomeBannerData获取首页banner数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  // 15-2.3 获取到的banner数据，赋值bannerList数据
  bannerList.value = res.result
}

const getHomeCategoryData = async () => {
  // 16-2.3 调用前台分类接口getHomeCategoryAPI获取分类数据
  const res = await getHomeCategoryAPI()
  console.log(res)
}
// 15-1.6 onLoad页面一打开就调用getHomeBannerData获取首页轮播图数据
// 16-2.4 onLoad页面一打开就调用getHomeCategoryData获取前台分类数据
onLoad(() => {
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
