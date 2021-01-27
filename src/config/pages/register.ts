export const registerValidate = {
  userName: [{
    required: true,
    message: "账号不能为空"
  }],
  userPassword: [{
    required: true,
    message: "密码不能为空"
  }],
  userPasswordComfirm: [{
    required: true,
    message: "密码确认不能为空"
  }],
  userPhone: [{
    required: true,
    message: "请输入手机号码"
  }],
  phoneVertifyCode: [{
    required: true,
    message: "请输入手机验证码"
  }],
  userEmail: [{
    required: true,
    message: "请输入邮箱"
  }],
  emailVertifyCode: [{
    required: true,
    message: "请输入邮箱验证码"
  }],
}


export const registerConfig = {
  userNameInput: {
    placeholder: "账号，5-20位数字、字母或下划线",
  },
  userPasswordInput: {
    placeholder: "密码，6-16位，必须包含数字和字母",
  },
  userPasswordComfirmInput: {
    placeholder: "确认密码，6-16位，必须包含数字和字母",
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
    placeholder: "使用者手机号码"
  },
  userGetEmail: {
    placeholder: "邮箱，常用的邮箱账号",
  },
  userInputButton: "注册"
}

const validatePass = async (rule: any, value: any) => {
  console.log('rule: ', rule)
  console.log('value: ', value)
  // if (value === '') {
  //   return Promise.reject('Please input the password');
  // } else {
  //   if (this.ruleForm.checkPass !== '') {
  //     this.$refs.ruleForm.validateField('checkPass');
  //   }
  //   return Promise.resolve();
  // }
  return Promise.reject("Two inputs don't match!");
};

export const registerRules = {
  userName: [{ validator: validatePass, trigger: "change" }]
}