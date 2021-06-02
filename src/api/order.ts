import request from '@/utils/request';

export function getOrder() {
  return request({
    method: 'post',
    url: '/api/getOrder',
  });
}

export function changeOrderStatus(data: any) {
  return request({
    method: 'post',
    url: '/api/changeOrder',
    data,
  })
}

export function getUserInfo(uid: any) {
  return request({
    method: 'POST',
    url: '/api/getUserInfo',
    data: {
      user_id: uid
    }
  })
}