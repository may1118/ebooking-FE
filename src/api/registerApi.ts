import request from '@/utils/request';

import { UserConfig } from '@/@type/interfaceRegister';

export function getPhoneVertify(phone: string) {
  return request({
    url: '',
    method: 'post',
  });
}

export function getEmailVertify(email: string) {
  return request({
    url: '',
    method: 'post',
  });
}

export function sendUserRegister(email: UserConfig) {
  return request({
    url: '',
    method: 'post',
  });
}
