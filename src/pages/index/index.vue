<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// 12-1.2 index.vue引入自定义导航栏组件
import CustomNavbar from './components/CustomNavbar.vue'
// 15-1.4 index.vue引入首页banner接口
import { getHomeBannerAPI } from '@/services/home'

// 15-2.2.3 index.vue引入BannerItem类型
import type { BannerItem } from '@/types/home'

// 15-2.2.4 定义接收到的bannerList数据类型为BannerItem数组
const bannerList = ref<BannerItem[]>([])
// 15-1.5 getHomeBannerData获取首页banner数据的函数
const getHomeBannerData = async () => {
  // 15-2.2.5 调用getHomeBannerAPI获取首页banner数据
  const res = await getHomeBannerAPI()
  // 15-2.3 获取到的banner数据，赋值bannerList数据
  bannerList.value = res.result
}

// 15-1.6 页面一打开就调用getHomeBannerData获取首页轮播图数据
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <!-- 12-1.3 使用自定义导航栏组件！ -->
  <CustomNavbar />
  <!--  13-1.3 使用XtxSwiper轮播图组件 -->
  <!-- Xtx开头的组件会自动引入，不再需要手动引入 -->
  <!-- 15-2.4 定义轮播图list属性,，传递bannerList数据 -->
  <XtxSwiper :list="bannerList" />
  <view class="index">index</view>
</template>

<style lang="scss"></style>
