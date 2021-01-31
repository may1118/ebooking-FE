import { ref } from 'vue';
import { Rules,ValidateSource,ValidateOption  } from 'async-validator';

import { UserConfig } from "@/@type/interfaceRegister";
import { registerConfig } from "@/config/pages/register";

export function clickGetEmailCode(...params: any) {
  console.log("params: ", params);
}


export const needGetInputRules = (input: UserConfig) => {
  const refPhoneIsVertify = ref(false);
  const refEmailIsVertify = ref(false);
  /**
   * @description 验证用户输入是否有效，5-20位数字 字母 _
   */
  const validateUserName = async (
      rule: Rules,
      value: any,
      callback: (error: string | string[] | void) => void
    ) => {
      const regex = registerConfig.userNameInput.regex
      if(!regex.test(value)){
        return Promise.reject(registerConfig.userNameInput.validate);
      }else {
        return Promise.resolve();
      }
  };
  const validatePassword = async (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void
  ) => {
    const regex = registerConfig.userPasswordInput.regex
    if(!regex.test(value)){
      return Promise.reject(registerConfig.userPasswordInput.validate);
    }else {
      return Promise.resolve();
    }
};
  const userPasswordComfirm = async (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void
  ) => {
    const { userPassword, userPasswordComfirm } = input;
    if(userPassword != userPasswordComfirm || (!userPassword && !userPasswordComfirm)){
      return Promise.reject(registerConfig.userPasswordComfirmInput.validate);
    }else {
      return Promise.resolve();
    }
  };
  const validatePhone = async (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void
  ) => {
    const regex = registerConfig.userGetPhoneInput.regex
    if(!regex.test(value)){
      return Promise.reject(registerConfig.userGetPhoneInput.validate);
    }else {
      refPhoneIsVertify.value = true;
      return Promise.resolve();
    }
  };
  const validateEmail = async (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void
  ) => {
    const regex = registerConfig.userGetEmail.regex
    if(!regex.test(value)){
      return Promise.reject(registerConfig.userGetEmail.validate);
    }else {
      refEmailIsVertify.value = true;
      return Promise.resolve();
    }
  };
  return {
    rules: {
      userName: [{ validator: validateUserName, trigger: "change" }],
      userPassword: [{
        validator: validatePassword,
        trigger: "change"
      }],
      userPasswordComfirm: [{
        validator: userPasswordComfirm,
        trigger: "change"
      }],
      userPhone: [{
        validator: validatePhone,
        trigger: "change"
      }],
      userEmail: [{
        validator: validateEmail,
        trigger: "change"
      }],
      phoneVertify: [{
        required: true,
        message: "请输入手机验证码",
      }],
      emailVertify: [{
        required: true,
        message: "请输入邮箱验证码",
      }],
    },
    refPhoneIsVertify,
    refEmailIsVertify,
  }
}
