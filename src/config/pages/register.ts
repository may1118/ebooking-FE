export const registerConfig = {
  userNameInput: {
    placeholder: "账号，5-20位数字、字母或下划线",
    validate: "请输入正确账号",
    regex: /^([0-9a-zA-Z]|_){5,20}$/
  },
  userPasswordInput: {
    placeholder: "密码，6-16位，必须包含数字和字母",
    validate: "请输入正确密码",
    regex: /(?![0-9]+$)(?![a-zA-Z]+$)^[0-9a-zA-Z]{6,20}$/
  },
  userPasswordComfirmInput: {
    placeholder: "确认密码，6-16位，必须包含数字和字母",
    validate: "请输入正确密码"
  },
  userPhoneAreaSelect: [{
      area: "中国",
      code: "+86",
      value: 0
    }, {
      area: "中国香港",
      code: "+852",
      value: 1
    }, {
      area: "中国澳门",
      code: "+853",
      value: 2
    }
  ],
  userGetVeritifyCode: "获取验证码",
  userGetPhoneInput: {
    placeholder: "使用者手机号码",
    validate: "请输入正确手机号",
    regex: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
  },
  userGetEmail: {
    placeholder: "邮箱，常用的邮箱账号",
    validate: "请输入正确邮箱",
    regex: /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/
  },
  userInputButton: "注册"
}