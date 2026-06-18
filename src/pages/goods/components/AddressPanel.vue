<!-- 31-3.1 创建地址弹出层组件goods/componets/AddressPannel.vue -->
<script setup lang="ts">
import type { AddressItem } from '@/types/address'
// 43-2.4 AddressPanel接收父组件传递的地址列表及选中地址项，并渲染至页面
const props = defineProps<{
  list: AddressItem[]
  selected?: AddressItem
}>()

// 31-3.9 关闭地址弹出层
// 31-3.9.1 点击地址关闭按钮，地址弹出层向父组件goods.vue发送关闭close事件
const emit = defineEmits<{
  (e: 'close'): void
  // 43-2.5 切换选中地址项
  // 43-2.5.1 注册向父组件goods.vue发送的change事件
  (e: 'change', selectItem: AddressItem): void
}>()

// 43-2.5.3 选中地址事件，向goods.vue发送change事件，传递选中的地址项
const onSelect = (item: AddressItem) => {
  emit('change', item)
}
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @tap="emit('close')"></text>
    <!-- 标题 -->
    <view class="title">配送至</view>
    <!-- 地址滚动区域 -->
    <scroll-view class="content" scroll-y>
      <!-- 有地址：循环后端地址 -->
      <!-- 43-2.5.2 地址项注册点击选中事件，传递当前选中的地址项 -->
      <view v-for="item in list" :key="item.id" class="item" @tap="onSelect(item)">
        <view class="user">{{ item.receiver }} {{ item.contact }}</view>
        <view class="address">{{ item.fullLocation }}{{ item.address }}</view>
        <!-- 选中对勾判断：id相等则实心勾选 -->
        <text
          class="icon"
          :class="{
            'icon-checked': selected?.id === item.id,
            'icon-ring': selected?.id !== item.id,
          }"
        ></text>
      </view>
      <!-- 无地址空提示 -->
      <view v-if="list.length === 0" class="empty-tip">暂无收货地址，请前往添加</view>
    </scroll-view>
    <!-- 底部按钮 -->
    <view class="footer">
      <!-- 新建地址跳转地址表单页 -->
      <navigator
        class="button secondary"
        hover-class="none"
        url="/pagesMember/address-form/address-form"
      >
        新建地址
      </navigator>
      <!-- 确定关闭弹窗 -->
      <view class="button primary" @tap="emit('close')">确定</view>
    </view>
  </view>
</template>

<style lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 16rpx 16rpx 0 0;
  position: relative;
  background-color: #fff;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ffe0e8;
  color: #333;
}

.close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
  font-size: 40rpx;
}

.content {
  flex: 1;
  min-height: 200rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(@/static/images/locate_1.png);
    position: relative;
    border-bottom: 1rpx solid #f5f5f5;
  }
  .icon {
    color: #bbb;
    font-size: 40rpx;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }
  .icon-checked {
    color: #fc7e9d;
  }
  .icon-ring {
    color: #bbb;
  }
  .user {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #999;
    margin-top: 8rpx;
  }
  .empty-tip {
    text-align: center;
    padding: 60rpx 0;
    font-size: 26rpx;
    color: #999;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #333;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #fc7e9d;
  }

  .secondary {
    background-color: #ffb3c2;
  }
}
</style>
