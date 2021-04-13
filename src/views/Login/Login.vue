<template>
  <div class="login">
    <div class="login-header">
      <p @click="changeLoginWay('account')" class="account-login">
        账号密码登陆
      </p>
      <p @click="changeLoginWay('email')" class="emial-login">邮箱验证登陆</p>
    </div>
    <a-form
      class="login-form-content"
      v-bind="layout"
      :model="loginForm"
      :rules="rules"
      @finish="handleLogin"
    >
      <div v-if="chooseAccount" class="account-login-form">
        <a-form-item label="账号" name="name">
          <a-input v-model:value="loginForm.name" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="loginForm.password" type="password" />
        </a-form-item>
      </div>
      <div v-else class="email-login-form">
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="loginForm.email" />
        </a-form-item>
        <a-form-item label="邮箱验证码" name="emailVertifyCode">
          <div class="login-form-email">
            <a-input v-model:value="loginForm.emailVertifyCode" />
            <a-button style="margin-left: 10px;" type="primary">获取验证码</a-button>
          </div>
        </a-form-item>
      </div>

      <a-form-item>
        <a-button
          type="primary"
          class="login-btn"
          :wrapper-col="{ span: 14, offset: 4 }"
          html-type="submit"
          >登陆</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const loginForm = reactive({
      name: "",
      password: "",
      email: "",
      emailVertifyCode: "",
    });
    const rules = {};
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const chooseAccount = ref(false)

    const changeLoginWay = (type) => {
      switch (type) {
        case "account":
          chooseAccount.value = true;
          console.log("choose account");
          break;
        case "email":
          chooseAccount.value = false;
          console.log("choose email");
          break;
        default:
          break;
      }
    };
    const handleLogin = () => {
      console.log("click login btn");
    };
    return {
      // data
      loginForm,
      rules,
      layout,
      chooseAccount,
      // function
      changeLoginWay,
      handleLogin,
    };
  },
};
</script>
<style lang="less" scoped>
.login {
  &-header {
    display: flex;
    justify-content: center;

    .account-login {
      border-right: 1px solid @border-color-base;
    }

    p {
      font-size: 16px;
      padding: 0 10px;
      color: @heading-color;
      cursor: pointer;
    }
  }

  .login-form-content {

    .login-form-email {
      display: flex;
    }
    .login-btn {
      width: 200px;
    }
  }
  overflow: hidden;
  float: right;
  width: 600px;
  margin-right: 20px;
  padding: 20px;

  border: 1px solid red;
}
</style>