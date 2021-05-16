import request from '@/utils/request';

export function getHotelBaseInfo(data: any) {
  return request({
    method: 'POST',
    url: '/api/getHotelBaseInfo',
    data,
  });
}