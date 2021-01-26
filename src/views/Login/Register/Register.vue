<template>
  <div class="register">
    <div class="register-header">
      <span>易程 · 酒店</span>
      商家入驻
    </div>
    <div class="register-form">
      <div class="register-form-header">注册</div>
      <div class="register-form-content">
        <div class="components-input-demo-presuffix">
          <!-- 账号 -->
          <a-input
            :placeholder="registerConfig.userNameInput.placeholder"
            v-model:value="userName"
            ref="userNameInput"
          >
            <template #prefix><user-outlined type="user"/></template>
          </a-input>
        </div>
        <!-- 密码 -->
        <div class="components-input-demo-presuffix">
          <a-input
            :placeholder="registerConfig.userPasswordInput.placeholder"
            v-model:value="userPassword"
            ref="userPasswordInput"
          >
            <template #prefix><LockOutlined type="user"/></template>
          </a-input>
        </div>
        <!-- 确认密码 -->
        <div class="components-input-demo-presuffix">
          <a-input
            :placeholder="registerConfig.userPasswordComfirmInput.placeholder"
            v-model:value="userPasswordComfirm"
            ref="userPasswordComfirmInput"
          >
            <template #prefix><LockOutlined type="user"/></template>
          </a-input>
        </div>
        <!-- 选择手机区号 -->
        <a-input-group compact>
          <a-select v-model:value="selectArea" style="width: 50%">
            <a-select-option
              v-for="item in registerConfig.userPhoneAreaSelect"
              :value="item.value"
              :key="item.value"
            >
              {{ item.code }} {{ item.area }}
            </a-select-option>
          </a-select>
          <a-input style="width: 50%" v-model:value="userPhone" />
        </a-input-group>
        <!-- 获取手机验证码 -->
        <div class="register-form-getVertifyCode">
          <a-input
            v-model:value="value"
            :placeholder="registerConfig.userGetPhoneInput.placeholder"
          />
          <a-button type="primary">
            {{ registerConfig.userGetVeritifyCode }}
          </a-button>
        </div>
        <!-- 注册按钮 -->
        <a-button type="primary">
          {{ registerConfig.userInputButton }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

import registerConfig from "@/config/pages/register";

export default {
  setup() {
    const userName = ref("");
    const userPassword = ref("");
    const userPasswordComfirm = ref("");
    const selectArea = ref(0);
    const userPhone = ref("");

    return {
      userName,
      selectArea,
      userPassword,
      userPasswordComfirm,
      userPhone,
      registerConfig
    };
  },
  components: {
    UserOutlined,
    LockOutlined
  }
};
</script>

<style lang="less" scoped>
.register {
  .register-header {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: @deep-color;
    background-color: @primary-color;

    span {
      margin-right: 30px;
    }
  }
  .register-form {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
    .register-form-header {
      color: @primary-color;
      font-weight: 700;
      font-size: 18px;
      display: flex;
      justify-content: center;
      padding: 20px 0 12px;
      border-bottom: 1px solid #ececec;
    }
    .register-form-content {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      div {
        margin-bottom: 10px;
      }
      .register-form-getVertifyCode {
        display: flex;
        input {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
