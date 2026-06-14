<!-- 35-1.1 创建pagesMember/profile/profile.vue个人信息分包页面 -->
<script setup lang="ts">
import { getMemberProfileAPI } from '@/services/profile'
import { onLoad } from '@dcloudio/uni-app'
import type { ProfileDetail } from '@/types/member'
import { ref } from 'vue'
import { useMemberStore } from '@/stores/modules/member'
const memberStore = useMemberStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 35-2.6 profile.vue 定义个人信息数据profile及类型
const profile = ref<ProfileDetail>()
// 35-2.2 调用个人信息接口,获取用户信息
const getMemberProfileData = async () => {
  const res = await getMemberProfileAPI()
  // 35-2.7 获取个人信息，将信息赋值给profile
  profile.value = res.result
}

// 35-2.3 页面加载时,调用个人信息接口,获取用户信息
onLoad(async () => {
  getMemberProfileData()
})

// 36-1.2 处理修改头像事件,uni.chooseMedia选择上传图片
const onAvatarChange = () => {
  uni.chooseMedia({
    // 36-1.2.1 选择数量count
    count: 1,
    // 36-1.2.2 选择图片类型mediaType
    mediaType: ['image'],
    // 36-1.3 选择图片后,获取图片路径,将图片上传至后端
    success: (res) => {
      // 36-1.3.1 解构获取图片路径
      const { tempFilePath } = res.tempFiles[0]
      // 36-1.3.2 uni.uploadFile将图片上传至后端接口
      uni.uploadFile({
        url: '/member/profile/avatar',
        filePath: tempFilePath,
        name: 'file',
        // 36-1.4 上传，根据状态码判断是否成功
        success: (res) => {
          // 36-1.4.1 状态码200，上传成功，将字符串data转换为js对象,
          // 将上传后的avatar赋值给profile的avatar，显示上传成功提示
          if (res.statusCode == 200) {
            const avatar = JSON.parse(res.data).result.avatar
            profile.value!.avatar = avatar
            uni.showToast({
              title: '上传成功',
              icon: 'success',
            })
          }
          // 36-1.4.2 状态码非200，上传失败，显示上传失败提示
          else {
            uni.showToast({
              title: '上传失败',
              icon: 'none',
            })
          }
        },
      })
    },
  })
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <!-- 35-2.8 渲染个人信息页面 -->
    <view class="avatar">
      <!-- 36-1.1 注册点击修改头像事件-->
      <view @tap="onAvatarChange" class="avatar-content">
        <image class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            :value="profile?.nickname"
            readonly
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group>
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <!-- 35-2.8.1 有出生日期则显示出生日期，否则日期选择框 -->
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile?.birthday"
          >
            <view v-if="profile?.birthday">{{ profile?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <!-- 35-2.8.2 有城市则显示城市，否则城市选择框  -->
          <picker class="picker" mode="region" :value="profile?.fullLocation?.split(' ')">
            <view v-if="profile?.fullLocation">{{ profile.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" :value="profile?.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
