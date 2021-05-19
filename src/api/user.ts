import request from '@/utils/request';

export function userLogin(data: any) {
  return request({
    method: 'POST',
    url: '/api/user/login',
    data,
  });
}