<!-- 32-1.1 创建login/login.vue登录页面 -->
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { postLoginWxMinAPI, postLoginWxMiniSimpleAPI } from '@/services/login'
import { useMemberStore } from '@/stores/modules/member'
import type { LoginResult } from '@/types/member'

// #ifdef MP-WEIXIN
// 32-1.5 login.vue引入使用微信登录服务接口，获取登录凭证
let code = ''
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})

// 32-1.7 处理获取手机号事件,获取手机号加密数据和IV值
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  const encryptedData = ev.detail!.encryptedData!
  const iv = ev.detail!.iv!
  // 32-1.8 调用登录服务接口postLoginWxMinAPI,传递登录凭证和手机号加密数据、IV值获取手机号信息
  const res = await postLoginWxMinAPI({
    code,
    encryptedData,
    iv,
  })
  console.log(res)
  loginSuccess(res.result)
}
// #endif

// 32-2.3 处理模拟登录事件,获取手机号信息
const onGetphonenumberSimple: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  // 32-2.4 导入调用模拟登录服务接口,传递手机号,获取登录信息
  const res = await postLoginWxMiniSimpleAPI('19176965419')
  loginSuccess(res.result)
}

// 32-3.6 封装登录成功后的跳转操作,传递登录结果
const loginSuccess = (profile: LoginResult) => {
  // 32-3.4 login.vue引入使用会员仓库，保存会员信息,提示登录成功
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  uni.showToast({
    title: '登录成功',
    icon: 'success',
  })
  // 32-3.5 登录成功后，停留1.5秒后跳转到开发页面首页
  setTimeout(() => {
    // uni.switchTab({ url: '/pages/my/my' })
    // 39-1.3 重新设置登录成功后跳转页面，跳转至上一页
    // （购物车页面显示未登录，点击登录之后，跳转至购物车页面）
    uni.navigateBack()
  }, 1500)
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <!-- <image
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      ></image> -->
      <image src="@/static/images/logo2.png"></image>
    </view>
    <view class="login">
      <!-- 44-1.1 条件编译，网页编译#ifdef H5 -->
      <!-- #ifdef H5 -->
      <!-- 网页端表单登录 -->
      <input class="input" type="text" placeholder="请输入用户名/手机号码" />
      <input class="input" type="text" password placeholder="请输入密码" />
      <button class="button phone">登录</button>
      <!-- #endif -->

      <!-- 44-1.1 条件编译，小程序编译#ifdef MP-WEIXIN -->
      <!-- #ifdef MP-WEIXIN -->
      <!-- 小程序端授权登录 -->
      <!-- 31-1.6 手机号登录按钮绑定获取手机号事件 -->
      <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->

      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <!-- 32-2.2 模拟登录按钮绑定模拟登录事件 -->
          <button class="button wechat" @tap="onGetphonenumberSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《拾味生活隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #fff5f8;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
  background-color: #fff5f8;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 230rpx;
    height: 230rpx;
    margin-top: 15vh;
    border-radius: 20rpx;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 30rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ffe0e8;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #fc7e9d;
  }

  .wechat {
    background-color: #ffb3c2;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ffe0e8;
      font-size: 26rpx;
      color: #666;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff5f8;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #fc7e9d;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #fc7e9d;
      color: #fc7e9d;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
