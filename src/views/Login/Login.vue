<template>
  <div class="login">
    <div class="login-header">
      <p
        @click="changeLoginWay('account')"
        :class="{ choosed: chooseAccount, 'account-login': true }"
      >
        账号密码登陆
      </p>
      <p
        @click="changeLoginWay('email')"
        :class="{ choosed: !chooseAccount, 'email-login': true }"
      >
        邮箱验证登陆
      </p>
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
            <a-button
              style="margin-left: 10px"
              type="primary"
              @click="getVertify"
              :disabled="buttonEmail || emailSeconds"
              >{{ refEmail }}</a-button
            >
          </div>
        </a-form-item>
      </div>
      <div class="comfirm-button">
        <a-button type="primary" class="login-btn" html-type="submit"
          >登陆</a-button
        >
      </div>
      <p class="forget">忘记账号/密码</p>
    </a-form>
  </div>
</template>

<script>
import { reactive, ref, watch, } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/loginApi";
import { notification } from "ant-design-vue";
import { getEmailVertify } from "@/api/registerApi";
export default {
  setup() {
    const router = useRouter();
    const loginForm = reactive({
      name: "",
      password: "",
      email: "1422073266@qq.com",
      emailVertifyCode: "",
    });
    const refEmail = ref("获取验证码");
    const rules = {
      name: [
        {
          required: true,
          message: "请输入",
          trigger: "blur",
        },
        { min: 1, max: 20, message: "仅限20个字符", trigger: "blur" },
      ],
      password: [
        {
          required: true,
          message: "请输入",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "请输入正确邮箱",
          trigger: "blur",
          type: "email",
        },
      ],
      emailVertifyCode: [
        { required: true, message: "请输入", trigger: "blur" },
      ],
    };
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const chooseAccount = ref(false);
    const emailSeconds = ref(0)
    const buttonEmail = ref(false);

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
    const handleLogin = async () => {
      const params = {};
      if (chooseAccount.value) {
        params.userName = loginForm.name;
        params.userPassword = loginForm.password;
      } else {
        params.userEmail = loginForm.email;
        params.emailVertifyCode = loginForm.emailVertifyCode;
      }
      try {
        await login(params);
        router.replace(`/ebooking/workbench`)
      } catch (error) {
        notification.open({
          message: "登陆失败",
          description: "请确认相关信息",
        });
      }
    };
    const getVertify = async () => {
      try {
        await getEmailVertify(loginForm.email);
        notification.open({
          message: "发送成功",
          description: "验证码5分钟内有效",
        });
        emailSeconds.value = 60;
        setInterval(() => {
          emailSeconds.value--
          refEmail.value = `${ emailSeconds.value }后重新获取`
        }, 1 * 1000);
      } catch (error) {
        notification.open({
          message: "发送失败",
          description: "请确认邮箱信息",
        });
      }
    };
    watch(() => loginForm.email, (newEmail) => {
      const regex = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/ig
      buttonEmail.value = !regex.test(newEmail)
    }, {
      immediate: true
    })
    return {
      // data
      refEmail,
      loginForm,
      rules,
      layout,
      chooseAccount,
      emailSeconds,
      buttonEmail,
      // function
      changeLoginWay,
      handleLogin,
      getVertify,
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
    .choosed {
      color: @primary-color;
    }
  }

  .login-form-content {
    .login-form-email {
      display: flex;
    }
    .login-btn {
      width: 200px;
    }
    .forget {
      float: right;
      margin-right: 50px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .comfirm-button {
    display: flex;
    justify-content: center;
  }
  overflow: hidden;
  float: right;
  width: 600px;
  margin-right: 20px;
  padding: 20px;
}
</style>
