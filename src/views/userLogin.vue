<template>
  <div class="login">
    <p>用户注册登陆</p>
    <span>只有注册登陆后才能购买</span>
    <a-form :rules="rules" :model="formState" @finish="handleUserLogin">
      <a-form-item label="姓名" name="name">
        <a-input style="width: 200px" v-model:value="formState.name"></a-input>
      </a-form-item>
      <a-form-item label="电话" name="phone">
        <a-input style="width: 200px" v-model:value="formState.phone"></a-input>
      </a-form-item>
      <a-button style="margin-left: 10px" type="primary" html-type="submit"
        >确认</a-button
      >
    </a-form>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { notification } from "ant-design-vue";
import { userLogin } from "@/api/user";
export default {
  name: "views",
  setup() {
    const formState = reactive({
      name: "",
      phone: "",
    });
    const rules = {
      name: [
        {
          required: true,
          message: "请输入",
          trigger: "blur",
        },
        { min: 1, max: 20, message: "仅限20个字符", trigger: "blur" },
      ],
      phone: [
        {
          required: true,
          message: "请输入",
          trigger: "blur",
        },
        {
          min: 11,
          max: 11,
          message: "请输入正确电话号码",
          trigger: "blur",
        },
      ],
    };

    const handleUserLogin = async () => {
      try {
        await userLogin({
          name: formState.name,
          phone: formState.phone,
        });
        location.reload();
      } catch (error) {
        notification["error"]({
          message: "登陆失败",
          description: "请确认信息",
        });
      }
    };
    const handleValidate = (...params) => {
      console.log(params);
    };
    return {
      formState,
      rules,

      handleUserLogin,
      handleValidate,
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
