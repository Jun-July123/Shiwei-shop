<!-- 42-3.1 从list.vue抽离订单列表至/components/OrderList.vue，实现订单列表组件化-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { OrderListParams, OrderItem } from '@/types/order'
import { OrderState, orderStateList } from '@/services/constants'
import { getMemberOrderAPI } from '@/services/order'
import { getPayMockAPI, getPayWxPayMiniPayAPI } from '@/services/pay'
// 获取屏幕安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 42-3.4 OrderList接收父组件list传递的参数
const props = defineProps<{
  orderState: number
}>()

// 42-3.6.3 OrderList定义接口请求参数queryParams类型为OrderListParams
const queryParams: OrderListParams = {
  page: 1,
  pageSize: 5,
  orderState: props.orderState,
}

// 42-3.6.4 定义订单列表数据类型为OrderItem数组
const orderList = ref<OrderItem[]>([])

// 42-3.7 获取订单列表数据getMemberOrderData
const getMemberOrderData = async () => {
  // 42-3.7.1 调用获取订单列表接口,传递queryParams，获取订单列表数据
  const res = await getMemberOrderAPI(queryParams)
  // 42-3.7.2 将接口获取到的订单列表数据赋值给orderList
  orderList.value = res.result.items
}

// 42-3.8 页面渲染时onMounted获取订单列表数据
onMounted(() => {
  getMemberOrderData()
})

// 42-4.2 支付事件（可从detail.vue中copy修改）
const onOrderPay = async (id: string) => {
  // 42-4.2.1 当开发环境下，调用模拟支付接口，传递订单id参数
  if (import.meta.env.DEV) {
    await getPayMockAPI({ orderId: id })
  } else {
    const res = await getPayWxPayMiniPayAPI({ orderId: id })
    // 42-4.2.2 否则，调用真实微信支付接口，传递支付参数res.result
    wx.requestPayment(res.result)
  }
  // 42-4.2.3 支付成功后，展示支付成功提示
  uni.showToast({
    title: '支付成功',
    icon: 'success',
  })
  // 42-4.2.4 find遍历查找订单列表中，当前订单id对应的订单项
  const order = orderList.value.find((item) => item.id === id)
  // 42-4.2.5 将查找到的订单项的订单状态由待支付切换为待发货
  order!.orderState = OrderState.DaiFaHuo
}
</script>
<template>
  <scroll-view scroll-y class="orders">
    <!-- 42-3.9 v-for渲染订单列表 -->
    <view class="card" v-for="order in orderList" :key="order.id">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ order.createTime }}</text>
        <!-- 42-3.9.1 导入constants/orderStateList订单状态列表渲染订单状态文字 -->
        <text>{{ orderStateList[order.orderState].text }}</text>
        <!-- 42-3.9.2 当订单状态为待评价/已完成/已取消（状态>=待评价），展示删除订单 -->
        <text v-if="order.orderState >= OrderState.DaiPingJia" class="icon-delete"></text>
      </view>
      <!-- 42-3.9.3 商品列表信息，点击商品跳转到订单详情-->
      <navigator
        v-for="sku in order.skus"
        :key="sku.id"
        class="goods"
        :url="`/pagesOrder/detail/detail?id=${order.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image mode="aspectFit" :src="sku.image"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ order.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount"> <text class="symbol">¥</text>{{ order.payMoney }}</text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 42-3.9.4 当订单状态为待付款状态时，显示去支付按钮，否则显示再次购买按钮 -->
        <template v-if="order.orderState === OrderState.DaiFuKuan">
          <!-- 42-4.1 支付按钮注册点击事件，传递当前订单id -->
          <view @tap="onOrderPay(order.id)" class="button primary">去支付</view>
        </template>
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=id`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 42-3.9.5 当订单状态为待收货状态时，展示确认收货按钮 -->
          <view v-if="order.orderState === OrderState.DaiShouHuo" class="button primary"
            >确认收货</view
          >
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ true ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<style lang="scss">
/* 订单列表 */
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20rpx;

    .button {
      width: 180rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
      border-radius: 60rpx;
      border: 1rpx solid #ccc;
      font-size: 26rpx;
      color: #444;
    }

    .secondary {
      color: #27ba9b;
      border-color: #27ba9b;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
