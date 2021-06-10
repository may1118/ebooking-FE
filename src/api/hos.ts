import request from '@/utils/request';

export function getHosList() {
  return request({
    method: 'POST',
    url: '/api/getHosList',
  });
}