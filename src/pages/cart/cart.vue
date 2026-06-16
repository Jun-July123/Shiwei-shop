<!-- 38-1.1 下载sku插件 -->
<!-- 38-1.2 将插件的vk-data-goods-sku-popup及vk-data-input-number-box引入到项目components中 -->
<!-- 38-1.3 cart.vue中使用sku组件,导入模板测试 -->
<template>
  <view class="test" style="padding: 3rem 1.5rem">
    <geek-sku
      v-model="skuShow"
      :data="skus"
      :themeColor="[226, 35, 26]"
      defaultCover="https://img-blog.csdnimg.cn/img_convert/587467738dfa4de190a7cd9818ca59fb.jpeg"
      btnConfirmText="购买"
      notSelectSku="请选择完整的商品信息"
      @skuChange="skuChange"
      @confirm="skuConfirm"
    ></geek-sku>
    <!-- 打开sku组件 -->
    <button @click="skuShow = true">打开sku组件</button>
  </view>
</template>

<script setup>
import { ref, reactive, inject, toRefs } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// sku列表
let skuShow = ref(false)
// sku列表
let skus = ref([
  {
    id: 1,
    price: 7000,
    stock: 30,
    sku_attrs: {
      机身颜色: '深空黑色',
      储存容量: '128G',
      套装: '快充套装',
    },
  },
  {
    id: 2,
    price: 8500,
    stock: 10,
    sku_attrs: {
      机身颜色: '暗紫色',
      储存容量: '256G',
      套装: '快充套装',
    },
  },
  {
    id: 3,
    price: 9500,
    stock: 0,
    sku_attrs: {
      机身颜色: '暗紫色',
      储存容量: '512G',
      套装: 'AirPods套装',
    },
  },
  {
    id: 4,
    price: 9200,
    stock: 60,
    sku_attrs: {
      机身颜色: '银色',
      储存容量: '512G',
      套装: 'AirPods套装',
    },
  },
  {
    id: 5,
    price: 9200,
    stock: 80,
    sku_attrs: {
      机身颜色: '金色',
      储存容量: '512G',
      套装: 'AirPods3套装',
    },
  },
])

// sku发生改变事件, 选择完整的sku则回返回 否则sku的值为{}
let skuChange = (sku) => {
  console.log(sku)
}
// sku确认事件
let skuConfirm = (e) => {
  console.log(e)
}
</script>
