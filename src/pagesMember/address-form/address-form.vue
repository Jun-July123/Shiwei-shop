<!-- 37-1.1 创建新增/修改地址页分包pagesMember/address-form.vue -->
<script setup lang="ts">
import {
  postMemberAddressAPI,
  getMemberAddressDetailAPI,
  putMemberAddressByIdAPI,
} from '@/services/address'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 37-2.4 address-form定义表单数据
const form = ref({
  receiver: '小样', // 收货人
  contact: '19151878176', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

// 37-4.3 address-form调用获取地址详情API，存在id传递地址id，获取地址详情
const getMemberAddressByIdData = async () => {
  if (query.id) {
    const res = await getMemberAddressDetailAPI(query.id)
    // 37-4.5 获取地址详情，Object.assign将信息赋值给form表单，显示渲染在页面上
    Object.assign(form.value, res.result)
  }
}

// 37-4.4 页面加载时,获取该地址id地址详情
onLoad(async () => {
  await getMemberAddressByIdData()
})

// 37-1.3 获取address.vue传递给address-form.vue的页面参数
const query = defineProps<{ id?: string }>()
// 37-1.4 根据参数是否有id动态设置修改/新建地址标题
uni.setNavigationBarTitle({
  title: query.id ? '修改地址' : '新建地址',
})

const onRegionChange = (e: any) => {
  // 37-2.6.2 获取并赋值所选择的地区
  form.value.fullLocation = e.detail.value.join(' ')
  // 37-2.6.3 解构获取所选择的地区编码
  if (e.detail.code) {
    const [provinceCode, cityCode, countyCode] = e.detail.code!
    // 37-2.6.4 获取选择的地区编码用于传递给后端
    Object.assign(form.value, { provinceCode, cityCode, countyCode })
    // form.value.provinceCode = provinceCode
  }
}

const onSwitchChange: UniHelper.SwitchOnChange = (e: any) => {
  // 37-2.7.2 获取并赋值是否设置为默认地址的状态
  form.value.isDefault = e.detail.value ? 1 : 0
}

const onSubmit = async () => {
  if (query.id) {
    // 37-5.2 提交表单，存在id，调用修改地址接口，传递地址id和表单数据
    await putMemberAddressByIdAPI(query.id, form.value)
  } else {
    // 37-2.8.2 处理提交事件,将收集到的表单数据提交至后端新增地址接口
    await postMemberAddressAPI(form.value)
  }
  // 37-2.8.3 提交成功,显示成功提示,并返回上一页
  uni.showToast({
    // 37-5.3 提交成功，存在id显示修改成功，否则提交成功
    title: query.id ? '修改地址成功' : '新增地址成功',
    icon: 'success',
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}
</script>

<template>
  <view class="content">
    <form>
      <!-- 表单内容 -->
      <!-- 37-2.5 绑定收集表单数据 -->
      <view class="form-item">
        <text class="label">收货人</text>
        <!-- 37-2.5.1 v-model 绑定收集收货人姓名 -->
        <input v-model="form.receiver" class="input" placeholder="请填写收货人姓名" />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <!-- 37-2.5.2 v-model 绑定收集收货人手机号码 -->
        <input v-model="form.contact" class="input" placeholder="请填写收货人手机号码" />
      </view>
      <view class="form-item">
        <text class="label">所在地区</text>
        <!-- 37-2.6.1 @change事件获取所选择的地区 -->
        <!-- 37-2.6.3 :value 绑定收集所选择的地区 -->
        <picker
          @change="onRegionChange"
          :value="form.fullLocation.split(' ')"
          class="picker"
          mode="region"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <!-- 37-2.5.3 v-model 绑定收集详细地址 -->
        <input v-model="form.address" class="input" placeholder="街道、楼牌号等信息" />
      </view>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <!-- 37-2.7.1 添加@change是否设置为默认地址 -->
        <!-- 37-2.7.3 :checked 绑定收集是否默认地址的状态,1为是 选中设置高亮,0为否 -->
        <switch
          @change="onSwitchChange"
          :checked="form.isDefault === 1"
          class="switch"
          color="#27ba9b"
        />
      </view>
    </form>
  </view>
  <!-- 提交按钮 -->
  <!-- 37-2.8.1 保存按钮，注册提交事件 -->
  <button @tap="onSubmit" class="button">保存并使用</button>{{ form }}
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
