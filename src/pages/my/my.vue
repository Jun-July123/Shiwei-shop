<!-- 33-1.1 创建pages/my/my用户页面 -->
<script setup lang="ts">
// import { ref } from 'vue'
// import type { XtxGuessInstance } from '@/types/component'
import { useGuessList } from '@/composables'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 引入会员仓库，获取会员信息
import { useMemberStore } from '@/stores/modules/member'
const memberStore = useMemberStore()
// 订单选项
const orderTypes = [
  { type: 1, text: '待付款', icon: 'icon-currency' },
  { type: 2, text: '待发货', icon: 'icon-gift' },
  { type: 3, text: '待收货', icon: 'icon-check' },
  { type: 4, text: '待评价', icon: 'icon-comment' },
]

// 33-2.1 定义绑定猜你喜欢实例，为XtxGuessInstance类型
// const guessRef = ref<XtxGuessInstance>()

// 33-2.3 处理滚动事件,调用猜你喜欢实例getMore,加载更多商品
// const onScrolltolower = () => {
//   guessRef.value?.getMore()
// }

// 33-2.6 引入useGuessList函数,解构调用,
// 获取猜你喜欢实例及滚动事件处理方法
const { guessRef, onScrollToLower } = useGuessList()
</script>

<template>
  <!-- 33-2.2 滚动组件，注册滚动事件 -->
  <scroll-view @scrolltolower="onScrollToLower" class="viewport" scroll-y enable-back-to-top>
    <!-- 个人资料 -->
    <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 情况1：已登录 -->
      <!-- 33-1.3 导入使用会员仓库，渲染用户信息 -->
      <view class="overview" v-if="true">
        <navigator url="/pagesMember/profile/profile" hover-class="none">
          <image
            class="avatar"
            mode="aspectFill"
            src="https://tse2-mm.cn.bing.net/th/id/OIP-C.UbUeQFxPPug-0F81qpLZYgHaHa?w=186&h=186&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3"
          ></image>
          <!-- <image class="avatar" mode="aspectFill" :src="memberStore.profile?.avatar"></image> -->
        </navigator>
        <view class="meta">
          <view class="nickname">{{
            memberStore.profile?.nickname || memberStore.profile?.account
          }}</view>
          <navigator class="extra" url="/pagesMember/profile/profile" hover-class="none">
            <text class="update">更新头像昵称</text>
          </navigator>
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image
            class="avatar gray"
            mode="aspectFill"
            src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
          ></image>
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login" hover-class="none" class="nickname">
            未登录
          </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>
      <navigator class="settings" url="/pagesMember/settings/settings" hover-class="none">
        设置
      </navigator>
    </view>
    <!-- 我的订单 -->
    <view class="orders">
      <view class="title">
        我的订单
        <navigator class="navigator" url="/pagesOrder/list/list?type=0" hover-class="none">
          查看全部订单<text class="icon-right"></text>
        </navigator>
      </view>
      <view class="section">
        <!-- 订单 -->
        <navigator
          v-for="item in orderTypes"
          :key="item.type"
          :class="item.icon"
          :url="`/pagesOrder/list/list?type=${item.type}`"
          class="navigator"
          hover-class="none"
        >
          {{ item.text }}
        </navigator>
        <!-- 客服 -->
        <button class="contact icon-handset" open-type="contact">售后</button>
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="guess">
      <XtxGuess ref="guessRef" />
    </view>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #fff5f8;
}

.viewport {
  height: 100%;
  background-repeat: no-repeat;
  // background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/center_bg.png);
  // background-image: url('/static/other/viewport_bg.jpg');
  background: linear-gradient(180deg, #fb7c9c 0%, #fff5f8 100%);
  background-size: 100% 45%;
  background-position: top center; /* 渐变对齐顶部 */
  background-repeat: no-repeat; /* 禁止渐变重复铺满 */
  border-radius: 0 0 40rpx 40rpx; /* 顺序：左上、右上、右下、左下 */
  overflow: hidden; /* 必须加，否则渐变溢出看不到圆角 */
}

/* 用户信息 */
.profile {
  margin-top: 20rpx;
  position: relative;

  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 36rpx;
    color: #fff;
  }

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    max-width: 350rpx;
    margin-bottom: 16rpx;
    font-size: 30rpx;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .extra {
    display: flex;
    font-size: 20rpx;
  }

  .tips {
    font-size: 22rpx;
  }

  .update {
    padding: 3rpx 10rpx 1rpx;
    color: rgba(255, 255, 255, 0.8);
    border: 1rpx solid rgba(255, 255, 255, 0.8);
    margin-right: 10rpx;
    border-radius: 30rpx;
  }

  .settings {
    position: absolute;
    bottom: 0;
    right: 40rpx;
    font-size: 30rpx;
    color: #fff;
  }
}

/* 我的订单 */
.orders {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 50rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #1e1e1e;

    .navigator {
      font-size: 24rpx;
      color: #939393;
      float: right;
    }
  }

  .section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 40rpx 20rpx 10rpx;
    .navigator,
    .contact {
      text-align: center;
      font-size: 24rpx;
      color: #333;
      &::before {
        display: block;
        font-size: 60rpx;
        // color: #ff9545;
        // color: #fc7e9d;
        color: #ff9ebb;
      }
    }
    .contact {
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
      line-height: inherit;
    }
  }
}

/* 猜你喜欢 */
.guess {
  background-color: #f7f7f8;
  margin-top: 20rpx;
}
</style>
