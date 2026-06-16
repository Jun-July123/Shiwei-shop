<!-- 39-1.1 cart.vue购物车静态结构 -->
<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { onShow } from '@dcloudio/uni-app'
import { getMemberCartAPI, deleteMemberCartAPI } from '@/services/cart'
const memberStore = useMemberStore()
import type { CartItem } from '@/types/cart.d'
import { putMemberCartBySkuIdAPI, putMemberCartSelectedAPI } from '@/services/cart'

import { computed, ref } from 'vue'
import type { InputNumberBoxEvent } from '@/components/vk-data-input-number-box/vk-data-input-number-box'
// 37-1.7.3 cart.vue定义购物车列表类型为CartItem[]类型
const cartList = ref<CartItem[]>([])

// 39-1.5 调用获取购物车列表接口，获取购物车列表数据
const getMemberCartData = async () => {
  const res = await getMemberCartAPI().then((res) => {
    // 39-1.8 获取购物车列表数据，渲染购物车列表
    // 39-1.8.1 将购物车列表赋值给cartList
    cartList.value = res.result
  })
}

// 39-2.3 删除事件，删除购物车商品
const onDeleteCart = async (skuId: string) => {
  // 39-2.3.1 删除弹窗
  uni.showModal({
    title: '提示',
    content: '确定删除该商品吗？',
    success: async (res) => {
      if (res.confirm) {
        // 39-2.3.2 确认删除，调用删除购物车商品接口
        await deleteMemberCartAPI({ ids: [skuId] })
        // 39-2.3.3 删除购物车商品成功，刷新购物车列表
        getMemberCartData()
      }
    },
  })
}

// 39-1.6 购物车页面显示时，存在token获取购物车列表
onShow(() => {
  if (memberStore.profile) {
    getMemberCartData()
  }
})

// 39-3.6  商品数量变化事件，更新商品数量
const onChangeCount = (ev: InputNumberBoxEvent) => {
  // 调用更新购物车商品接口putMemberCartBySkuIdAPI，传递唯一标识商品skuId和数量参数
  putMemberCartBySkuIdAPI(ev.index, { count: ev.value })
}

// 39-4.2 商品选中事件，更新商品选中状态
const onChangeSelected = (item: CartItem) => {
  // 39-4.2.1 取反切换商品选中状态
  item.selected = !item.selected
  // 39-4.2.2 调用购物车商品接口，传递唯一标识商品skuId和选中状态参数，后端更新单品选中状态
  putMemberCartBySkuIdAPI(item.skuId, { selected: item.selected })
}

// 39-4.3 计算全选
// 39-4.3.1 定义computed属性全选状态isSellectAll
const isSellectAll = computed(() => {
  // 39-4.3.2 every遍历购物车列表，判断所有商品是否选中
  return cartList.value.length && cartList.value.every((v) => v.selected)
})

// 39-4.5 全选反选事件-->
const onChangeSelectedAll = () => {
  // 39-4.5.1 获取当前的选中状态，并取反
  const _isSelectedAll = !isSellectAll.value
  // 39-4.5.2 切换所有商品选中状态
  cartList.value.forEach((v) => {
    v.selected = _isSelectedAll
  })
  // 39-4.7 调用全选反选商品接口，传递选中状态参数，后端更新购物车商品全选反选状态
  putMemberCartSelectedAPI({ selected: _isSelectedAll })
}

// 39-5.1 computed计算filter过滤出购物车选中的商品列表
const selectedCartList = computed(() => {
  return cartList.value.filter((item) => item.selected)
})

// 39-5.2 computed计算reduce遍历出商品选中的总件数
const selectedCartListCount = computed((item) => {
  return selectedCartList.value.reduce((sum, item) => sum + item.count, 0)
})

// 39-5.4 computed计算reduce遍历出商品选中的总金额
const selectedCartListMoney = computed(() => {
  return selectedCartList.value
    .reduce((sum, item) => sum + item.count * item.nowPrice, 0)
    .toFixed(2)
})

// 39-5.7 结算事件
const gotoPayment = () => {
  // 39-5.7.1 判断是否有选中的商品，没有选中的商品提示用户选择商品
  if (selectedCartListCount.value === 0) {
    return uni.showToast({ title: '请选择商品', icon: 'none' })
  }
  // 39-5.7.2 有选中的商品，跳转结算页面（目前先提示用户结算中）
  uni.showToast({ title: '结算中...' })
}
</script>

<template>
  <scroll-view scroll-y class="scroll-view">
    <!-- 已登录: 显示购物车 -->
    <!-- 39-1.2 导入用户仓库，根据是否有用户信息，显示不同内容 -->
    <template v-if="memberStore.profile">
      <!-- 购物车列表 -->
      <!-- 39-1.8.2 v-if判断购物车列表是否为空，为空则显示空状态 -->
      <view class="cart-list" v-if="cartList.length > 0">
        <!-- 优惠提示 -->
        <view class="tips">
          <text class="label">满减</text>
          <text class="desc">满1件, 即可享受9折优惠</text>
        </view>
        <!-- 滑动操作分区 -->
        <uni-swipe-action>
          <!-- 滑动操作项 -->
          <!-- 39-1.8.3 v-for遍历购物车列表，渲染每个商品项 -->
          <uni-swipe-action-item v-for="item in cartList" :key="item.skuId" class="cart-swipe">
            <!-- 商品信息 -->
            <view class="goods">
              <!-- 选中状态 -->
              <!-- 39-4.1 商品选中状态注册点击事件，传递商品item-->
              <text
                @tap="onChangeSelected(item)"
                class="checkbox"
                :class="{ checked: item.selected }"
              ></text>
              <navigator
                :url="`/pages/goods/goods?id=${item.id}`"
                hover-class="none"
                class="navigator"
              >
                <image mode="aspectFill" class="picture" :src="item.picture"></image>
                <view class="meta">
                  <view class="name ellipsis">{{ item.name }}</view>
                  <view class="attrsText ellipsis">{{ item.attrsText }}</view>
                  <view class="price">{{ item.nowPrice }}</view>
                </view>
              </navigator>
              <!-- 商品数量 -->
              <view class="count">
                <!-- 39-3.2 商品数量加减结构text修改为步进器组件vk-data-input-number-box -->
                <!-- 39-3.3 v-model绑定商品数量,min最小值,max最大值,index唯一标识商品skuId -->
                <!-- 39-3.4 @change 监听步进器组件数量变化事件，更新商品数量 -->
                <vk-data-input-number-box
                  v-model="item.count"
                  :min="1"
                  :max="item.stock"
                  :index="item.skuId"
                  @change="onChangeCount"
                />
              </view>
            </view>
            <!-- 右侧删除按钮 -->
            <template #right>
              <view class="cart-swipe-right">
                <!-- 39-2.2 删除按钮，注册删除事件，传递商品skuId -->
                <button @tap="onDeleteCart(item.skuId)" class="button delete-button">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <!-- 购物车空状态 -->
      <view class="cart-blank" v-else>
        <image src="/static/images/blank_cart.png" class="image" />
        <text class="text">购物车还是空的，快来挑选好货吧</text>
        <navigator open-type="switchTab" url="/pages/index/index" hover-class="none">
          <button class="button">去首页看看</button>
        </navigator>
      </view>
      <!-- 吸底工具栏 -->
      <view class="toolbar">
        <!-- 39-4.1 isSelected决定是否添加全选类 -->
        <!-- 39-4.4 注册全选反选点击事件-->
        <text @tap="onChangeSelectedAll" class="all" :class="{ checked: isSellectAll }">全选</text>
        <text class="text">合计:</text>
        <!-- 39-5.5 渲染选中的商品总金额 -->
        <text class="amount">{{ selectedCartListMoney }}</text>
        <view class="button-grounp">
          <!-- 39-5.3 渲染选中的总件数，当商品选中的总件数为0时，添加禁用类 -->
          <!-- 39-5.6 结算按钮注册去结算点击事件 -->
          <view
            @tap="gotoPayment"
            class="button payment-button"
            :class="{ disabled: selectedCartListCount === 0 }"
          >
            去结算({{ selectedCartListCount }})
          </view>
        </view>
      </view>
    </template>
    <!-- 未登录: 提示登录 -->
    <view class="login-blank" v-else>
      <text class="text">登录后可查看购物车中的商品</text>
      <navigator url="/pages/login/login" hover-class="none">
        <button class="button">去登录</button>
      </navigator>
    </view>
    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef"></XtxGuess>
    <!-- 底部占位空盒子 -->
    <view class="toolbar-height"></view>
  </scroll-view>
</template>

<style lang="scss">
// 根元素
:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f8;
}

// 滚动容器
.scroll-view {
  flex: 1;
}

// 购物车列表
.cart-list {
  padding: 0 20rpx;

  // 优惠提示
  .tips {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 30rpx 10rpx;
    font-size: 26rpx;
    color: #666;

    .label {
      color: #fff;
      padding: 7rpx 15rpx 5rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
      background-color: #27ba9b;
      margin-right: 10rpx;
    }
  }

  // 购物车商品
  .goods {
    display: flex;
    padding: 20rpx 20rpx 20rpx 80rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;

    .navigator {
      display: flex;
    }

    .checkbox {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 100%;

      &::before {
        content: '\e6cd';
        font-family: 'erabbit' !important;
        font-size: 40rpx;
        color: #444;
      }

      &.checked::before {
        content: '\e6cc';
        color: #27ba9b;
      }
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
    }

    .name {
      height: 72rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrsText {
      line-height: 1.8;
      padding: 0 15rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .price {
      line-height: 1;
      font-size: 26rpx;
      color: #444;
      margin-bottom: 2rpx;
      color: #cf4444;

      &::before {
        content: '￥';
        font-size: 80%;
      }
    }

    // 商品数量
    .count {
      position: absolute;
      bottom: 20rpx;
      right: 5rpx;

      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220rpx;
      height: 48rpx;

      .text {
        height: 100%;
        padding: 0 20rpx;
        font-size: 32rpx;
        color: #444;
      }

      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #444;
        background-color: #f6f6f6;
      }
    }
  }

  .cart-swipe {
    display: block;
    margin: 20rpx 0;
  }

  .cart-swipe-right {
    display: flex;
    height: 100%;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      padding: 6px;
      line-height: 1.5;
      color: #fff;
      font-size: 26rpx;
      border-radius: 0;
    }

    .delete-button {
      background-color: #cf4444;
    }
  }
}

// 空状态
.cart-blank,
.login-blank {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  .image {
    width: 400rpx;
    height: 281rpx;
  }
  .text {
    color: #444;
    font-size: 26rpx;
    margin: 20rpx 0;
  }
  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 26rpx;
    border-radius: 60rpx;
    color: #fff;
    background-color: #27ba9b;
  }
}

// 吸底工具栏
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: var(--window-bottom);
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;

  .all {
    margin-left: 25rpx;
    font-size: 14px;
    color: #444;
    display: flex;
    align-items: center;
  }

  .all::before {
    font-family: 'erabbit' !important;
    content: '\e6cd';
    font-size: 40rpx;
    margin-right: 8rpx;
  }

  .checked::before {
    content: '\e6cc';
    color: #27ba9b;
  }

  .text {
    margin-right: 8rpx;
    margin-left: 32rpx;
    color: #444;
    font-size: 14px;
  }

  .amount {
    font-size: 20px;
    color: #cf4444;

    .decimal {
      font-size: 12px;
    }

    &::before {
      content: '￥';
      font-size: 12px;
    }
  }

  .button-grounp {
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 72rpx;
    font-size: 13px;
    color: #fff;

    .button {
      width: 240rpx;
      margin: 0 10rpx;
      border-radius: 72rpx;
    }

    .payment-button {
      background-color: #27ba9b;

      &.disabled {
        opacity: 0.6;
      }
    }
  }
}
// 底部占位空盒子
.toolbar-height {
  height: 100rpx;
}
</style>
