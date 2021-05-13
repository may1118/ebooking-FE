import request from '@/utils/request';

export function login(data: any) {
  return request({
    method: 'POST',
    url: '/api/login',
    data,
  });
}