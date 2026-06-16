<!-- 30-1.1 新建商品详情页src/pages/goods/goods.vue -->
<script setup lang="ts">
// 30-1.2 获取屏幕边界到安全区域距离,用于设置用户操作区域的padding-bottom
const { safeAreaInsets } = uni.getSystemInfoSync()
import { getGoodsByIdAPI } from '@/services/goods'
import { onLoad } from '@dcloudio/uni-app'
import type { GoodsResult } from '@/types/goods'
import { ref, computed } from 'vue'
import ServicePanel from './components/ServicePanel.vue'
import AddressPanel from './components/AddressPanel.vue'
import type {
  SkuPopupLocaldata,
  SkuPopupInstanceType,
  SkuPopupEvent,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import { postMemberCartAPI } from '@/services/cart'

// 30-1.3 defineProps接收category传递的商品id
const query = defineProps<{
  id: string
}>()
// 30-2.3 goods.vue定义商品goods为GoodsResult类型
const goods = ref<GoodsResult>()
// 30-1.6 导入调用商品详情接口获取商品详情
const getGoodsByIdData = async () => {
  const res = await getGoodsByIdAPI(query.id)
  // 30-2.4 获取商品详情数据，赋值给goods.value
  goods.value = res.result

  // 38-2.4 将获取到的商品详情数据转换为sku组件所需格式
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.values })),
    sku_list: res.result.skus.map((v) => ({
      _id: v.id,
      goods_id: res.result.id,
      goods_name: res.result.name,
      image: v.picture,
      price: v.price * 100, // 注意：需要乘以 100
      stock: v.inventory,
      sku_name_arr: v.specs.map((vv) => vv.valueName),
    })),
  }
}

// 30-1.7 页面加载时调用商品详情接口获取商品详情
onLoad(() => {
  getGoodsByIdData()
})

const currentIndex = ref(0)
// 31-1.2 处理轮播图change事件，类型为UniHelper.SwiperOnChange
const onChange: UniHelper.SwiperOnChange = (ev) => {
  // 31-1.3 轮播图变化，更新当前商品轮播图索引
  currentIndex.value = ev.detail!.current
}

// 31-1.6 处理图片绑定点击事件，uni.previewImage预览图片
const onTabImage = (url: string) => {
  uni.previewImage({
    urls: [url],
    current: url,
  })
}

// 31-2.3 UniHelper.UniPopupType定义弹出层实例类型
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()

// 31-3.4 定义弹出层条件渲染(服务弹出层或地址弹出层)
const popupName = ref<'address' | 'service'>()
// 31-3.5 定义打开弹出层事件，接收弹出层名称参数，根据名称渲染不同的弹出层
const openPopup = (name: typeof popupName.value) => {
  popupName.value = name
  popup.value?.open()
}

// sku列表
const isShowSku = ref(false)
// 38-2.3 定义localdata类型为SkuPopupLocaldata
const localdata = ref({} as SkuPopupLocaldata)

// 38-3.2 枚举定义sku弹窗按钮模式
enum SkuMode {
  Both = 1, //弹窗显示购物车和购买按钮
  Cart = 2, //弹窗显示购物车按钮
  Buy = 3, //弹窗显示购买按钮
}
const mode = ref<SkuMode>(SkuMode.Both)

// 38-3.3 点击不同按钮显示不同sku模式
const openSkuPopup = (val: SkuMode) => {
  // 38-3.3.1 显示sku弹窗
  isShowSku.value = true
  // 38-3.3.2 根据点击按钮模式，更新mode.value
  mode.value = val
}
// 38-4.2 获取sku弹窗组件实例，类型为SkuPopupInstanceType
const skuPopupRef = ref<SkuPopupInstanceType>()
// 38-4.3 计算获取sku弹窗内选中的商品规格,并显示在页面
const slectArrText = computed(() => {
  return skuPopupRef.value?.selectArr?.join(' ').trim() || '请选择商品规格'
})

// 38-5.3 添加购物车事件，调用加入购物车接口，传递商品skuId和count
const onAddCart = (ev: SkuPopupEvent) => {
  console.log(ev)
  postMemberCartAPI({
    skuId: ev._id,
    count: ev.buy_num,
  })
  // 38-5.4 加入购物车成功后，显示成功提示,并关闭弹出弹窗
  uni.showToast({
    title: '加入购物车成功',
    icon: 'success',
  })
  setTimeout(() => {
    isShowSku.value = false
  }, 1000)
}
</script>
<template>
  <!-- 38-2.2 goods.vue使用sku弹窗组件，绑定isShowSku变量控制弹窗显示隐藏 -->
  <!-- 38-2.3 添加:localdata属性绑定localdata -->
  <!-- 38-3.1 sku弹出配置mode模式 -->
  <!-- 38-3.7 定义购物车和购买按钮背景颜色 -->
  <!-- 38-4.1 ref绑定sku弹窗组件 -->
  <!-- 38-4.4 定义sku弹窗选中商品规格的显示样式 -->
  <!-- 38-5.1 sku弹窗注册添加购物车事件 -->
  <vk-data-goods-sku-popup
    @add-cart="onAddCart"
    ref="skuPopupRef"
    :active-style="{
      color: '#27BA9B',
      borderColor: '#27BA9B',
      backgroundColor: '#27BA9B',
    }"
    :mode="mode"
    add-cart-background-color="#FFA868"
    buy-now-background-color="#27BA9B"
    v-model="isShowSku"
    :localdata="localdata"
  />
  <scroll-view scroll-y class="viewport">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <!-- 31-1.1 商品轮播图绑定change事件,监听轮播图变化 -->
        <swiper circular @change="onChange">
          <!-- 30-2.5 v-for渲染商品基本信息 -->
          <swiper-item v-for="item in goods?.mainPictures" :key="item">
            <!-- 31-1.5 商品轮播图图片绑定点击事件 -->
            <image @tap="onTabImage(item)" mode="aspectFill" :src="item" />
          </swiper-item>
        </swiper>
        <!-- 31-1.4 商品轮播图指示器，更新当前商品轮播图下标-->
        <view class="indicator">
          <text class="current">{{ currentIndex + 1 }}</text>
          <text class="split">/</text>
          <text class="total">{{ goods?.mainPictures.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ goods?.price }}</text>
        </view>
        <view class="name ellipsis">{{ goods?.name }}</view>
        <view class="desc"> {{ goods?.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <!-- 38-2.5 选择商品规格绑定点击事件，打开sku弹窗 -->
        <!-- 38-3.4 点击选择，调用openSkuPopup传递SkuMode.Both，显示购物车和购买按钮 -->
        <view @tap="openSkuPopup(SkuMode.Both)" class="item arrow">
          <text class="label">选择</text>
          <text class="text ellipsis"> {{ slectArrText }} </text>
        </view>
        <!-- 31-3.6 地址/服务绑定打开弹出层事件，传递弹出层名称参数 -->
        <view @tap="openPopup('address')" class="item arrow">
          <text class="label">送至</text>
          <text class="text ellipsis"> 请选择收获地址 </text>
        </view>
        <view @tap="openPopup('service')" class="item arrow">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <!-- 30-2.6 v-for渲染商品属性详情 -->
          <view class="item" v-for="item in goods?.details.properties" :key="item.name">
            <text class="label">{{ item.name }}</text>
            <text class="value">{{ item.value }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image
          v-for="item in goods?.details.pictures"
          :key="item"
          mode="widthFix"
          :src="item"
        ></image>
      </view>
    </view>
    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <!-- 30-2.7 v-for渲染商品详情同类推荐 -->
        <navigator
          v-for="item in goods?.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/goods?id=${item.id}`"
        >
          <image class="image" mode="aspectFill" :src="item.picture"></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator class="icons-button" url="/pages/cart/cart" open-type="switchTab">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <!-- 38-3.5 点击加入购物车，调用openSkuPopup传递SkuMode.Cart，显示购物车按钮 -->
      <view @tap="openSkuPopup(SkuMode.Cart)" class="addcart"> 加入购物车 </view>
      <!-- 38-3.6 点击立即购买，调用openSkuPopup传递SkuMode.Buy，显示购买按钮 -->
      <view @tap="openSkuPopup(SkuMode.Buy)" class="buynow"> 立即购买 </view>
    </view>
  </view>

  <!-- 31-2.1 商品详情弹出层uni-popup,定义popup变量添加ref属性绑定实例 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <!-- 31-3.3 goods.vue导入使用服务及地址弹出层 -->
    <!-- 31-3.7 v-if渲染弹出层 -->
    <!-- 31-3.8.2 父组件ServicePanel标签监听服务弹出层关闭事件，关闭弹出层 -->
    <ServicePanel v-if="popupName === 'service'" @close="popup?.close()" />
    <!-- 31-3.9.2 父组件AddressPanel标签监听地址弹出层关闭事件，关闭弹出层 -->
    <AddressPanel v-if="popupName === 'address'" @close="popup?.close()" />
  </uni-popup>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    .image {
      width: 750rpx;
      height: 750rpx;
    }
    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      .current {
        font-size: 26rpx;
      }
      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }
      .total {
        font-size: 24rpx;
      }
    }
  }
  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }
    .number {
      font-size: 56rpx;
    }
    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
    .image {
      width: 100%;
    }
  }
  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }
    .label {
      width: 200rpx;
    }
    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  .content {
    padding: 0 20rpx 200rpx;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    .goods {
      width: 340rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 7rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }
    .image {
      width: 300rpx;
      height: 260rpx;
    }
    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }
    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }
    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }
  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx var(--window-bottom);
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow,
    .payment {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
      &::after {
        border: none;
      }
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
