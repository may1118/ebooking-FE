import request from '@/utils/request';

import { UserConfig } from '@/@type/interfaceRegister';

export function getPhoneVertify(phone: string) {
  return request({
  });
}

export function getEmailVertify(email: string): Promise<any> {
  return request({
    url: '/api/email/get',
    method: 'post',
    data: {
      email: email
    }
  });
}

export function sendUserRegister(userInfo: UserConfig): Promise<any> {
  return request({
    url: '/api/register',
    method: 'post',
    data: {
      ...userInfo
    }
  });
}
