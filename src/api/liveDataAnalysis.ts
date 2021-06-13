import request from '@/utils/request';

export function getData(data) {
  return request({
    method: 'POST',
    url: '/api/getData',
    data
  });
}