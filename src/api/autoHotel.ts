import request from '@/utils/request';

export function saveHotelAuto(data: any) {
  return request({
    method: 'POST',
    url: '/api/autoHotel',
    data,
  });
}