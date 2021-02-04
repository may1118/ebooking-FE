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
      const errorInfo = registerConfig.userNameInput.validate
      return regex.test(value) ? Promise.resolve() : Promise.reject(errorInfo)
  };
  const validatePassword = async (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void
  ) => {
    const regex = registerConfig.userPasswordInput.regex
    const errorInfo = registerConfig.userPasswordInput.validate
    return regex.test(value) ? Promise.resolve() : Promise.reject(errorInfo)
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
  const validateYZM = async (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void
  ) => {
    const regex = /^[0-9]{1,}$/;
    return regex.test(value) ? Promise.resolve() : Promise.reject("请输入验证码")
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
      phoneVertifyCode: [{
        validator: validateYZM,
        trigger: "change"
      }],
      emailVertifyCode: [{
        validator: validateYZM,
        trigger: "change"
      }],
    },
    refPhoneIsVertify,
    refEmailIsVertify,
  }
}
