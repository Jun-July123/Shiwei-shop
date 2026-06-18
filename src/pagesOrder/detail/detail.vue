<!-- 41-1.1 订单详情页静态结构pagesOrder/detail/detail.vue -->
<script setup lang="ts">
import { useGuessList } from '@/composables'
import { ref } from 'vue'
import { onReady, onLoad } from '@dcloudio/uni-app'
import {
  getMemberOrderConsignmentByIdAPI,
  getMemberOrderByIdAPI,
  putMemberOrderReceiptByIdAPI,
  getMemberOrderLogisticsByIdAPI,
  deleteMemberOrderAPI,
} from '@/services/order'
import type { OrderResult, OrderLogisticResult, LogisticItem } from '@/types/order'
import { OrderState, orderStateList } from '@/services/constants'
import { getPayWxPayMiniPayAPI, getPayMockAPI } from '@/services/pay'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 猜你喜欢
const { guessRef, onScrollToLower } = useGuessList()
// 弹出层组件
const popup = ref<UniHelper.UniPopupInstance>()
// 取消原因列表
const reasonList = ref([
  '商品无货',
  '不想要了',
  '商品信息填错了',
  '地址信息填写错误',
  '商品降价',
  '其它',
])
// 订单取消原因
const reason = ref('')
// 复制内容
const onCopy = (id: string) => {
  // 设置系统剪贴板的内容
  uni.setClipboardData({ data: id })
}
// 获取页面参数
const query = defineProps<{
  id: string
}>()

// 41-1.2.2 detail.vue获取页面栈getCurrentPages()
const pages = getCurrentPages()

// 41-1.3 从页面栈中获取当前页面实例pageInstance(数组的最后一项)
const pageInstance = pages.at(-1) as any

// 41-1.4 页面渲染完毕onReady，页面绑定动画效果
// pageInstance.animate(动画目标, 动画属性, 动画时间, 动画参数)
onReady(() => {
  // 41-1.5 动画效果，导航栏背景色
  pageInstance.animate(
    // 41-1.5.1 navbar绑定动画效果
    '.navbar',
    // 41-1.5.2 动画背景属性: backgroundColor
    [{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }],
    // 41-1.5.3 动画时间: 1000ms
    1000,
    // 41-1.5.4 动画参数: scrollSource, timeRange, startScrollOffset, endScrollOffset
    {
      scrollSource: '#scroller', // 滚动源为scroll-view#scroller
      timeRange: 1000,
      startScrollOffset: 0, // 导航栏初始位置为0时, 透明背景transparent
      endScrollOffset: 50, // 导航栏最终位置为50时, 白色背景#f8f8f8
    },
  )

  // 41-1.6 动画效果,导航栏标题
  pageInstance.animate('.navbar .title', [{ color: 'transparent' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
  // 41-1.7 动画效果,导航栏返回按钮
  pageInstance.animate('.navbar .back', [{ color: '#fff' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
})

// 41-2.4.3 detail.vue定义订单详情order类型为OrderResult类型
const order = ref<OrderResult>()

// 41-2.2 detail.vue调用订单详情接口，获取订单详情
const getMemberOrderByIdData = async () => {
  const res = await getMemberOrderByIdAPI(query.id)
  // 41-2.5 将接口获取到的订单详情赋值给order
  order.value = res.result
  // 41-7.5 当获取到订单详情后，当前订单状态为待收货、待评价、已完成时获取物流信息
  if (
    [OrderState.DaiShouHuo, OrderState.DaiPingJia, OrderState.YiWanCheng].includes(
      order.value!.orderState,
    )
  ) {
    await getMemberOrderLogisticsByIdData()
  }
}

// 41-7.4 detail.vue获取物流信息
// 41-7.4.1 定义物流信息列表logisticList类型为LogisticItem[]类型
const logisticList = ref<LogisticItem[]>([])
// 41-7.4.2 调用获取物流信息接口，获取物流信息，传递订单id参数
const getMemberOrderLogisticsByIdData = async () => {
  const res = await getMemberOrderLogisticsByIdAPI(query.id)
  // 41-7.4.3 将接口获取到的物流信息赋值给logisticList.value
  logisticList.value = res.result.list
}

// 41-2.3 页面加载时获取订单详情
onLoad(() => {
  getMemberOrderByIdData()
})

// 41-3.2 倒计时结束事件，将订单状态改为已取消
const onTimeUp = () => {
  // order.value!.orderState = OrderState.YiQuXiao
}

// 41-4.4 支付事件，调用支付接口，传递订单id参数
const onOrderPay = async () => {
  // 41-4.9 当开发环境下，调用模拟支付接口，传递支付参数res.result
  if (import.meta.env.DEV) {
    await getPayMockAPI({ orderId: query.id })
  } else {
    // #ifdef MP-WEIXIN
    const res = await getPayWxPayMiniPayAPI({ orderId: query.id })
    // 41-4.5 调用真实微信支付接口，传递支付参数res.result
    wx.requestPayment(res.result)
    // #endif
  }
  // 41-4.7 支付成功后，关闭当前页面，跳转到支付结果页,传递订单id参数
  uni.redirectTo({
    url: `/pagesOrder/payment/payment?id=${query.id}`,
  })
}

// 41-5.2 detail.vue定义isDev变量，判断是否为开发环境
const isDev = import.meta.env.DEV

// 41-5.5 模拟发货事件
const onOrderSend = async () => {
  if (isDev) {
    // 41-5.5.1 如果当前为开发环境,调用模拟发货接口,传递订单id参数
    await getMemberOrderConsignmentByIdAPI({ id: query.id })
    // 41-5.5.2 模拟发货成功，提示模拟发货成功
    uni.showToast({ title: '模拟发货成功', icon: 'success' })
    // 41-5.5.3 发货成功后，更新订单状态为待收货
    order.value!.orderState = OrderState.DaiShouHuo
  }
}

// 41-6.4 确认收货事件
const onOrderConfirm = async () => {
  // 41-6.4.1 确认收货弹窗
  uni.showModal({
    title: '确认收货',
    content: '为了保障您的权益，请收到商品并确认无误后，再确认收货',
    success: async (res) => {
      // 41-6.4.2 确认收货，调用确认收货接口，传递订单id参数
      if (res.confirm) {
        await putMemberOrderReceiptByIdAPI({ id: query.id })
        // 41-6.4.3 确认收货成功，提示确认收货成功
        uni.showToast({ title: '确认收货成功', icon: 'success' })
        // 41-6.4.4 确认收货成功后，更新订单状态为待评价
        order.value!.orderState = OrderState.DaiPingJia
      }
    },
  })
}

// 41-8.4 删除订单事件
const onOrderDelete = () => {
  // 41-8.4.1 确认删除弹窗
  uni.showModal({
    title: '删除订单',
    content: '确认删除订单吗？',
    success: async (res) => {
      // 41-8.4.2 确认删除，调用删除接口，传递订单id数组参数
      if (res.confirm) {
        await deleteMemberOrderAPI({ ids: [query.id] })
        // 41-8.4.3 删除订单成功，提示删除订单成功
        uni.showToast({ title: '删除订单成功', icon: 'success' })
        // 41-8.4.4 关闭当前页面，创建订单列表分包页，跳转至订单列表页
        uni.redirectTo({
          url: '/pagesOrder/list/list',
        })
      }
    },
  })
}
</script>

<template>
  <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="wrap">
      <!-- #ifdef MP-WEIXIN -->
      <!-- 41-1.2.3 如果页面数>1，导航栏左上角显示返回上一页按钮 -->
      <navigator
        v-if="pages.length > 1"
        open-type="navigateBack"
        class="back icon-left"
      ></navigator>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <!-- 14-1.2.4 否则显示返回首页按钮 -->
      <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
      </navigator>
      <!-- #endif -->
      <view class="title">订单详情</view>
    </view>
  </view>
  <scroll-view scroll-y class="viewport" id="scroller" @scrolltolower="onScrollToLower">
    <template v-if="order">
      <!-- 订单状态 -->
      <view class="overview" :style="{ paddingTop: safeAreaInsets!.top + 20 + 'px' }">
        <!-- 待付款状态:展示去支付按钮和倒计时 -->
        <!-- 41-2.6.2 导入订单状态枚举及列表，当订单状态为待付款时，展示待付款状态文字 -->
        <template v-if="order?.orderState === OrderState.DaiFuKuan">
          <view class="status icon-clock">等待付款</view>
          <view class="tips">
            <text class="money">应付金额: ¥ {{ order.payMoney }}</text>
            <text class="time">支付剩余</text>
            <!-- 41-3.1 uni-countdown组件实现待付款倒计时 -->
            <!-- 41-3.1.1 :seconds="order.countdown" 倒计时时间 -->
            <!-- 41-3.1.2 @timeup="onTimeUp" 注册倒计时结束事件 -->
            <uni-countdown
              :seconds="30"
              @timeup="onTimeUp"
              color="#fff"
              :show-day="false"
              :show-colon="false"
              splitor-color="#fff"
            ></uni-countdown>
          </view>
          <!-- 41-4.3 支付按钮注册点击事件 -->
          <view @tap="onOrderPay" class="button">去支付</view>
        </template>
        <!-- 其他订单状态:展示再次购买按钮 -->
        <template v-else>
          <!-- 订单状态文字 -->
          <!-- 41-2.6.3 其他订单状态，根据订单状态列表，展示订单状态文字 -->
          <view class="status"> {{ orderStateList[order.orderState].text }} </view>
          <view class="button-group">
            <navigator
              class="button"
              :url="`/pagesOrder/create/create?orderId=${query.id}`"
              hover-class="none"
            >
              再次购买
            </navigator>
            <!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
            <!-- 41-5.3 当在开发环境且订单状态为待发货时，显示模拟发货按钮 -->
            <!-- 41-5.4 模拟发货注册点击事件 -->
            <view
              v-if="isDev && order.orderState == OrderState.DaiFaHuo"
              @tap="onOrderSend"
              class="button"
            >
              模拟发货
            </view>
            <!-- 41-6.2 当订单状态为待收货时，显示确认收货按钮 -->
            <!-- 41-6.3 确认收货按钮注册点击事件 -->
            <view
              v-if="order.orderState == OrderState.DaiShouHuo"
              @tap="onOrderConfirm"
              class="button"
              >确认收货
            </view>
          </view>
        </template>
      </view>
      <!-- 配送状态 -->
      <view class="shipment">
        <!-- 41-7.6 渲染订单物流信息 -->
        <view v-for="item in logisticList" :key="item.id" class="item">
          <view class="message">
            {{ item.text }}
          </view>
          <view class="date"> {{ item.time }} </view>
        </view>
        <!-- 用户收货地址 -->
        <view class="locate">
          <view class="user"> {{ order.receiverContact }} {{ order.receiverMobile }} </view>
          <view class="address"> {{ order.receiverAddress }} </view>
        </view>
      </view>
      <!-- 41-8.2 整体渲染订单详情页面 -->
      <!-- 41-8.2.1 渲染商品信息 -->
      <view class="goods">
        <view class="item">
          <navigator
            class="navigator"
            v-for="item in order.skus"
            :key="item.id"
            :url="`/pages/goods/goods?id=${item.spuId}`"
            hover-class="none"
          >
            <image class="cover" :src="item.image"></image>
            <view class="meta">
              <view class="name ellipsis">{{ item.name }}</view>
              <view class="type">{{ item.attrsText }}</view>
              <view class="price">
                <view class="actual">
                  <text class="symbol">¥</text>
                  <text>{{ item.curPrice }}</text>
                </view>
              </view>
              <view class="quantity">x{{ item.quantity }}</view>
            </view>
          </navigator>
          <!-- 待评价状态:展示按钮 -->
          <!-- 41-8.2.2 当订单状态为待评价时，展示评价按钮 -->
          <view class="action" v-if="order.orderState == OrderState.DaiPingJia">
            <view class="button primary">申请售后</view>
            <navigator url="" class="button"> 去评价 </navigator>
          </view>
        </view>
        <!-- 41-8.2.3 渲染订单总价 -->
        <view class="total">
          <view class="row">
            <view class="text">商品总价: </view>
            <view class="symbol">{{ order.totalMoney }}</view>
          </view>
          <view class="row">
            <view class="text">运费: </view>
            <view class="symbol">{{ order.postFee }}</view>
          </view>
          <view class="row">
            <view class="text">应付金额: </view>
            <view class="symbol primary">{{ order.payMoney }}</view>
          </view>
        </view>
      </view>

      <view class="detail">
        <view class="title">订单信息</view>
        <view class="row">
          <!-- 41-8.2.4 渲染订单信息 -->
          <view class="item"
            >订单编号: {{ query.id }} <text class="copy" @tap="onCopy(query.id)">复制</text></view
          >
          <view class="item">下单时间: {{ order.createTime }}</view>
        </view>
      </view>

      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />

      <!-- 底部操作栏-->
      <view class="toolbar-height" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
      <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
        <!-- 41-8.2.5 当订单状态为待付款，展示支付按钮 -->
        <template v-if="order.orderState == OrderState.DaiFuKuan">
          <!-- 41-8.2.6 点击去支付，触发去支付事件 -->
          <view class="button primary" @tap="onOrderPay"> 去支付 </view>
          <view class="button" @tap="popup?.open?.()"> 取消订单 </view>
        </template>
        <!-- 其他订单状态:按需展示按钮 -->
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=${query.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 41-8.2.7 当订单状态为待收货状态时，展示确认收货按钮 -->
          <view class="button primary" v-if="order.orderState === OrderState.DaiShouHuo"
            >确认收货</view
          >
          <!-- 41-8.2.8 当订单状态为待评价状态时，展示去评价 -->
          <view class="button" v-if="order.orderState === OrderState.DaiPingJia"> 去评价 </view>
          <!-- 41-8.2.9 当订单状态为待评价/已完成/已取消时（枚举的值大于大于待评价），展示删除订单按钮 -->
          <!-- 41-8.3 删除按钮注册点击事件 -->
          <view
            v-if="order.orderState >= OrderState.DaiPingJia"
            @tap="onOrderDelete"
            class="button delete"
          >
            删除订单
          </view>
        </template>
      </view>
    </template>
    <template v-else>
      <!-- 骨架屏组件 -->
      <PageSkeleton />
    </template>
  </scroll-view>
  <!-- 取消订单弹窗 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="popup-root">
      <view class="title">订单取消</view>
      <view class="description">
        <view class="tips">请选择取消订单的原因：</view>
        <view class="cell" v-for="item in reasonList" :key="item" @tap="reason = item">
          <text class="text">{{ item }}</text>
          <text class="icon" :class="{ checked: item === reason }"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button" @tap="popup?.close?.()">取消</view>
        <view class="button primary">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #fff5f8;
}

.navbar {
  width: 750rpx;
  color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  // background-color: rgba(219, 49, 49, 0);
  // background-color: transparent;

  .wrap {
    position: relative;

    .title {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32rpx;
      /* color: #000; */
      color: transparent;
    }

    .back {
      position: absolute;
      left: 0;
      height: 44px;
      width: 44px;
      font-size: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      /* color: #000; */
      color: #fff;
    }
  }
}

.viewport {
  background-color: #f7f7f8;
}

.overview {
  display: flex;
  flex-direction: column;
  align-items: center;

  line-height: 1;
  padding-bottom: 30rpx;
  color: #fff;
  // background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  // background-size: cover;
  background-repeat: no-repeat;
  // background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/center_bg.png);
  // background-image: url('/static/other/viewport_bg.jpg');
  background: linear-gradient(180deg, #fb7c9c 0%, #fff5f8 100%);
  background-size: 100% 100%;
  background-position: top center; /* 渐变对齐顶部 */
  background-repeat: no-repeat; /* 禁止渐变重复铺满 */
  border-radius: 0 0 40rpx 40rpx; /* 顺序：左上、右上、右下、左下 */
  overflow: hidden; /* 必须加，否则渐变溢出看不到圆角 */

  .status {
    font-size: 36rpx;
  }

  .status::before {
    margin-right: 6rpx;
    font-weight: 500;
  }

  .tips {
    margin: 30rpx 0;
    display: flex;
    font-size: 14px;
    align-items: center;

    .money {
      margin-right: 30rpx;
    }
  }

  .button-group {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    width: 260rpx;
    height: 64rpx;
    margin: 0 10rpx;
    text-align: center;
    line-height: 64rpx;
    font-size: 28rpx;
    color: #fc7e9d;
    border-radius: 68rpx;
    background-color: #fff;
  }
}

.shipment {
  line-height: 1.4;
  padding: 0 20rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;

  .locate,
  .item {
    min-height: 120rpx;
    padding: 30rpx 30rpx 25rpx 75rpx;
    background-size: 50rpx;
    background-repeat: no-repeat;
    background-position: 6rpx center;
  }

  .locate {
    // background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    background-image: url('/static/images/locate_1.png');
    .user {
      font-size: 26rpx;
      color: #444;
    }

    .address {
      font-size: 24rpx;
      color: #666;
    }
  }

  .item {
    // background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/car.png);
    background-image: url('/static/images/car_2.png');
    border-bottom: 1rpx solid #eee;
    position: relative;

    .message {
      font-size: 26rpx;
      color: #444;
    }

    .date {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.goods {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    padding: 30rpx 0;
    border-bottom: 1rpx solid #eee;

    .navigator {
      display: flex;
      margin: 20rpx 0;
    }

    .cover {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .price {
      display: flex;
      margin-top: 6rpx;
      font-size: 24rpx;
    }

    .symbol {
      font-size: 20rpx;
    }

    .original {
      color: #999;
      text-decoration: line-through;
    }

    .actual {
      margin-left: 10rpx;
      color: #444;
    }

    .text {
      font-size: 22rpx;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 24rpx;
      color: #444;
    }

    .action {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-start;
      padding: 30rpx 0 0;

      .button {
        width: 200rpx;
        height: 60rpx;
        text-align: center;
        justify-content: center;
        line-height: 60rpx;
        margin-left: 20rpx;
        border-radius: 60rpx;
        border: 1rpx solid #ccc;
        font-size: 26rpx;
        color: #444;
      }

      .primary {
        color: #fc7e9d;
        border-color: #fc7e9d;
      }
    }
  }

  .total {
    line-height: 1;
    font-size: 26rpx;
    padding: 20rpx 0;
    color: #666;

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10rpx 0;
    }

    .symbol::before {
      content: '¥';
      font-size: 80%;
      margin-right: 3rpx;
    }

    .primary {
      color: #fc7e9d;
      font-size: 36rpx;
    }
  }
}

.detail {
  line-height: 1;
  padding: 30rpx 20rpx 0;
  margin: 20rpx 20rpx 0;
  font-size: 26rpx;
  color: #666;
  border-radius: 10rpx;
  background-color: #fff;

  .title {
    font-size: 30rpx;
    color: #444;
  }

  .row {
    padding: 20rpx 0;

    .item {
      padding: 10rpx 0;
      display: flex;
      align-items: center;
    }

    .copy {
      border-radius: 20rpx;
      font-size: 20rpx;
      border: 1px solid #ccc;
      padding: 5rpx 10rpx;
      margin-left: 10rpx;
    }
  }
}

.toolbar-height {
  height: 100rpx;
  box-sizing: content-box;
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200rpx;
    height: 72rpx;
    margin-left: 15rpx;
    font-size: 26rpx;
    border-radius: 72rpx;
    border: 1rpx solid #ccc;
    color: #444;
  }

  .delete {
    order: 4;
  }

  .button {
    order: 3;
  }

  .secondary {
    order: 2;
    color: #fc7e9d;
    border-color: #fc7e9d;
  }

  .primary {
    order: 1;
    color: #fff;
    background-color: #fc7e9d;
  }
}

.popup-root {
  padding: 30rpx 30rpx 0;
  border-radius: 10rpx 10rpx 0 0;
  overflow: hidden;

  .title {
    font-size: 30rpx;
    text-align: center;
    margin-bottom: 30rpx;
  }

  .description {
    font-size: 28rpx;
    padding: 0 20rpx;

    .tips {
      color: #444;
      margin-bottom: 12rpx;
    }

    .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15rpx 0;
      color: #666;
    }

    .icon::before {
      content: '\e6cd';
      font-family: 'erabbit' !important;
      font-size: 38rpx;
      color: #999;
    }

    .icon.checked::before {
      content: '\e6cc';
      font-size: 38rpx;
      color: #fc7e9d;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 0 40rpx;
    font-size: 28rpx;
    color: #444;

    .button {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      color: #444;
      border-radius: 72rpx;
      border: 1rpx solid #ccc;
    }

    .primary {
      color: #fff;
      background-color: #fc7e9d;
      border: none;
    }
  }
}
</style>
