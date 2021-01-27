import { Rules,ValidateSource,ValidateOption  } from 'async-validator';
import { UserConfig } from "@/@type/interfaceRegister";
import { registerConfig } from "@/config/pages/register";

export function clickGetEmailCode(...params: any) {
  console.log("params: ", params);
}


export const needGetInputRules = (input: UserConfig) => {
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
  if(input.userPassword != input.userPasswordComfirm){
    return Promise.reject(registerConfig.userPasswordComfirmInput.validate);
  }else {
    return Promise.resolve();
  }
};
  return {
    userName: [{ validator: validateUserName, trigger: "change" }],
    userPassword: [{
      validator: validatePassword,
      trigger: "change"
    }],
    userPasswordComfirm: [{
      validator: userPasswordComfirm,
      trigger: "change"
    }]
  }
}
