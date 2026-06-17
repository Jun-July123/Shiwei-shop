<!-- 37-1.1 创建地址页分包pagesMember/address.vue -->
<script setup lang="ts">
import { getMemberAddressListAPI, deleteMemberAddressAPI } from '@/services/address'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import type { AddressItem } from '@/types/address'
import { useAddressStore } from '@/stores/modules/address'

// 37-3.6 addressList.vue定义收货地址列表，类型为AddressItem[]
const addressList = ref<AddressItem[]>([])
// 37-3.2 address.vue 调用接口收货列表接口获取收货地址列表
const getMemberAddressData = async () => {
  const res = await getMemberAddressListAPI()
  // 37-3.7 获取收货地址列表数据并赋值给addressList
  addressList.value = res.result
}

// 37-3.3 onShow页面显示时，获取最新收货地址列表
onShow(() => {
  getMemberAddressData()
})

// 37-7.7 删除事件，传递当前地址项id删除地址
const onDeleteAddress = async (id: string) => {
  // 37-7.7.1 显示确认删除弹窗
  uni.showModal({
    title: '提示',
    content: '确定删除该地址吗？',
    success: async (res) => {
      // 37-7.7.2 确认删除后，调用接口删除地址并刷新地址列表
      if (res.confirm) {
        await deleteMemberAddressAPI(id)
        getMemberAddressData()
      }
    },
  })
}

// 40-2.5 切换地址事件
const onChangeAddress = (item: AddressItem) => {
  // 40-2.5.1 导入使用地址仓库
  const addressStore = useAddressStore()
  // 40-2.5.2 调用地址仓库的切换选中地址方法，传递当前选中的地址，更新选中地址
  addressStore.changeSelectedAddress(item)
  // 40-2.5.3 切换选中的地址后，返回上一页
  uni.navigateBack()
}
</script>

<template>
  <view class="viewport">
    <!-- 地址列表 -->
    <scroll-view class="scroll-view" scroll-y>
      <!-- 37-7.1 当addressList不为空时，显示地址列表 -->
      <view v-if="addressList.length" class="address">
        <!-- 37-7.2 修改view收货地址列表结构为uni-swipe-action -->
        <uni-swipe-action class="address-list">
          <!-- 收货地址项 -->
          <!-- 37-3.8 v-for渲染收货地址列表 -->
          <!-- 37-7.3 修改view收货地址项结构为uni-swipe-action-item -->
          <uni-swipe-action-item v-for="item in addressList" :key="item.id" class="item">
            <!-- 40-2.4 pagesMember/address.vue 注册点击事件，传递当前选中的地址 -->
            <view @tap="onChangeAddress(item)" class="item-content">
              <view class="user">
                {{ item.receiver }}
                <text class="contact">{{ item.contact }}</text>
                <text v-if="item.isDefault" class="badge">默认</text>
              </view>
              <view class="locate">{{ item.fullLocation }}{{ item.address }}</view>
              <!-- 40-2.8 address.vue 地址项添加了点击切换选中地址，然后返回上一页功能-->
              <!-- 点击修改不再跳转到修改页面 ，添加阻止冒泡事件 -->
              <!-- 点击修改，不受父元素的点击切换选中地址事件的影响-->
              <navigator
                @tap.stop="() => {}"
                class="edit"
                hover-class="none"
                :url="`/pagesMember/address-form/address-form?id=${item.id}`"
              >
                修改
              </navigator>
            </view>
            <!-- 37-7.4 右侧插槽v-slot:right，添加删除按钮 -->
            <template v-slot:right>
              <!-- 37-7.6 删除按钮添加点击事件，传递当前地址项id-->
              <button @tap="onDeleteAddress(item.id)" class="delete-button">删除</button>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <view v-else class="blank">暂无收货地址</view>
    </scroll-view>
    <!-- 添加按钮 -->
    <view class="add-btn">
      <navigator hover-class="none" url="/pagesMember/address-form/address-form">
        新建地址
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

/* 删除按钮 */
.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  font-size: 28rpx;
  color: #fff;
  border-radius: 0;
  padding: 0;
  background-color: #cf4444;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f4f4f4;

  .scroll-view {
    padding-top: 20rpx;
  }
}

.address {
  padding: 0 20rpx;
  margin: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item-content {
    line-height: 1;
    padding: 40rpx 10rpx 38rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;

    .edit {
      position: absolute;
      top: 36rpx;
      right: 30rpx;
      padding: 2rpx 0 2rpx 20rpx;
      border-left: 1rpx solid #666;
      font-size: 26rpx;
      color: #666;
      line-height: 1;
    }
  }

  .item:last-child .item-content {
    border: none;
  }

  .user {
    font-size: 28rpx;
    margin-bottom: 20rpx;
    color: #333;

    .contact {
      color: #666;
    }

    .badge {
      display: inline-block;
      padding: 4rpx 10rpx 2rpx 14rpx;
      margin: 2rpx 0 0 10rpx;
      font-size: 26rpx;
      color: #27ba9b;
      border-radius: 6rpx;
      border: 1rpx solid #27ba9b;
    }
  }

  .locate {
    line-height: 1.6;
    font-size: 26rpx;
    color: #333;
  }
}

.blank {
  margin-top: 300rpx;
  text-align: center;
  font-size: 32rpx;
  color: #888;
}

.add-btn {
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
