import { ref } from 'vue';
import { notification } from 'ant-design-vue';
import { Rules } from 'async-validator';

import { UserConfig } from "@/@type/interfaceRegister";
import { registerConfig } from "@/config/pages/register";

import { getEmailVertify, sendUserRegister } from '@/api/registerApi'

export async function clickGetEmailCode(val: string, type: string) {
  switch (type) {
    case 'email':
      const { code } = await getEmailVertify(val)
      // success
      if (code === 0) {
        notification.open({
          message: '发送成功',
          description: '验证码5分钟内有效',
        });  
      } else {
        notification.open({
          message: '发送失败',
          description: '请确认邮箱信息',
        });  
      }
      break;
      case 'phone':
        // clickGetEmailCodeOut函数暂时还没支持获取手机验证码
        console.log('------>由于资金问题，暂时还没支持，统一使用【111111】')
      break;
    default:
      break;
  }
}
export async function clickRegister(userInfo: UserConfig) {
  const data = await sendUserRegister(userInfo)
  if (data.code === 0) {
    notification.open({
      message: '注册',
      description: '注册成功',
    });  
  } else {
    notification.open({
      message: '注册失败',
      description: '请再次确认',
    });  
  }
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
