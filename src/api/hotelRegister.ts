import request from '@/utils/request';

export function getRegion(name?: string): Promise<any> {
  return request({
    url: '/api/getRegion',
    method: 'get',
    params: {
      name
    }
  });
}

export function hotelRegister(data: string): Promise<any> {
  return request({
    url: '/api/hotelRegister',
    method: 'post',
    data,
  });
}