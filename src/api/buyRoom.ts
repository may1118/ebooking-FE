import request from '@/utils/request';

export function buyRoom(data: any): any {
  return request({
    method: 'GET',
    url: '/api/buyRoom',
    params: {
      position: data,
    },
  });
}

export function comfirmBuy(data: any): any {
  return request({
    method: 'POST',
    url: '/api/buyRoom/buy',
    data
  })
}