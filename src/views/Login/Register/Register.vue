<template>
  <div class="register">
    <div class="register-header">
      <span>易程 · 酒店</span>
      商家入驻
    </div>
    <div class="register-form">
      <div class="register-form-header">注册</div>
      <a-form
        class="register-form-content"
        layout="vertical"
        :model="reaRegisterInput"
        :rules="rules"
        @finish="clickRegister"
      >
        <!-- 账号 -->
        <a-form-item class="components-input-demo-presuffix" name="userName">
          <a-input
            :placeholder="registerConfig.userNameInput.placeholder"
            v-model:value="reaRegisterInput.userName"
          >
            <template #prefix><user-outlined type="user"/></template>
          </a-input>
        </a-form-item>
        <!-- 密码 -->
        <a-form-item
          class="components-input-demo-presuffix"
          name="userPassword"
        >
          <a-input
            :placeholder="registerConfig.userPasswordInput.placeholder"
            v-model:value="reaRegisterInput.userPassword"
            type="password"
          >
            <template #prefix><LockOutlined type="password"/></template>
          </a-input>
        </a-form-item>
        <!-- 确认密码 -->
        <a-form-item
          class="components-input-demo-presuffix"
          name="userPasswordComfirm"
        >
          <a-input
            :placeholder="registerConfig.userPasswordComfirmInput.placeholder"
            v-model:value="reaRegisterInput.userPasswordComfirm"
            type="password"
          >
            <template #prefix><LockOutlined type="comfirmPassword"/></template>
          </a-input>
        </a-form-item>
        <!-- 选择手机区号 -->
        <a-input-group compact class="register-form-raw">
          <a-form-item>
            <a-select
              v-model:value="reaRegisterInput.selectArea"
              class="register-form-rawLeft"
            >
              <a-select-option
                v-for="item in registerConfig.userPhoneAreaSelect"
                :value="item.value"
                :key="item.value"
              >
                {{ item.code }} {{ item.area }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="userPhone" class="register-form-rawRight">
            <a-input
              v-model:value="reaRegisterInput.userPhone"
              :placeholder="registerConfig.userGetPhoneInput.placeholder"
            />
          </a-form-item>
        </a-input-group>

        <!-- 获取手机验证码 -->
        <a-form-item name="phoneVertifyCode">
          <div class="register-form-rawItem">
            <a-input v-model:value="reaRegisterInput.phoneVertifyCode" />
            <!-- <a-button :disabled="!refPhoneIsVertify" type="primary">
              {{ registerConfig.userGetVeritifyCode }}
            </a-button> -->
            <a-button
              :disabled="!refPhoneIsVertify && phoneSeconds !== 0"
              type="primary"
              @click="clickGetEmailCode(reaRegisterInput.userPhone, 'phone')"
            >
              {{ phoneSeconds === 0 ? registerConfig.userGetVeritifyCode : phoneSeconds + '秒后重试' }}
            </a-button>
          </div>
        </a-form-item>
        <!-- 邮箱 -->
        <a-form-item name="userEmail" class="components-input-demo-presuffix">
          <a-input
            :placeholder="registerConfig.userGetEmail.placeholder"
            v-model:value="reaRegisterInput.userEmail"
            type="email"
          >
            <template #prefix><MailOutlined type="email"/></template>
          </a-input>
        </a-form-item>
        <!-- 获取邮箱验证码 -->
        <a-form-item name="emailVertifyCode">
          <div class="register-form-rawItem">
            <a-input v-model:value="reaRegisterInput.emailVertifyCode" />
            <a-button
              :disabled="!refEmailIsVertify && emailSeconds !== 0"
              type="primary"
              @click="clickGetEmailCode(reaRegisterInput.userEmail, 'email')"
            >
              {{ emailSeconds === 0 ? registerConfig.userGetVeritifyCode : emailSeconds + '秒后重试' }}
            </a-button>
          </div>
        </a-form-item>
        <!-- 注册按钮 -->
        <a-form-item>
          <a-button type="primary" html-type="submit">
            {{ registerConfig.userInputButton }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';

import { registerConfig } from '@/config/pages/register';
import { UserConfig } from '@/@type/interfaceRegister';
import { clickGetEmailCode as clickGetEmailCodeOut, needGetInputRules, clickRegister } from './RegisterFuc';

export default {
  setup() {
    const reaRegisterInput: UserConfig = reactive({
      userName: 'mzyTest11',
      userPassword: 'mazhenyan1118',
      userPasswordComfirm: 'mazhenyan1118',
      selectArea: 0,
      userPhone: '18890062982',
      phoneVertifyCode: '',
      userEmail: '1422073266@qq.com',
      emailVertifyCode: '',
    });
    const emailSeconds = ref(0)
    const phoneSeconds = ref(0)
    const { rules, refPhoneIsVertify, refEmailIsVertify } = needGetInputRules(
      reaRegisterInput
    );

    const clickGetEmailCode = (val: string, type: string) => {
      switch (type) {
        case 'email':
          emailSeconds.value = 60
          clickGetEmailCodeOut(val, type)
          // 开始计时，不断减少计时器的值
          const intervalEmail = setInterval(() => {
            if (emailSeconds.value === 0) {
              clearInterval(intervalEmail)
            } else {
              emailSeconds.value--
            }
          }, 1000)
          break;
        case 'phone':
          phoneSeconds.value = 60
          clickGetEmailCodeOut(val, type) 
          // 开始计时，不断减少计时器的值
          const intervalPhone = setInterval(() => {
            if (phoneSeconds.value === 0) {
              clearInterval(intervalPhone)
            } else {
              phoneSeconds.value--
            }
          }, 1000)
        default:
          break;
      }
    }

    return {
      // data
      emailSeconds,
      phoneSeconds,
      reaRegisterInput,
      registerConfig,
      // form rules
      rules,
      refPhoneIsVertify,
      refEmailIsVertify,
      // handle functions
      clickGetEmailCode,
      clickRegister,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
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
      > div,
      .ant-form-item /** antd默认的某一个样式的margin-bottom */ {
        margin-bottom: 10px;
      }
      .register-form-raw {
        display: flex;
        .register-form-rawRight {
          width: 100%;
        }
      }

      .register-form-rawItem {
        display: flex;
        input {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
