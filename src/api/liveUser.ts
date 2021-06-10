import request from '@/utils/request';

export function getUserOrder() {
  return request({
    method: 'post',
    url: '/api/getUserOrder',
  });
}

export function userCancelOrder(data: any) {
  return request({
    method: 'post',
    url: '/api/userCancelOrder',
    data,
  })
}

export function addComment(data: any) {
  return request({
    method: 'post',
    url: '/api/addComment',
    data,
  })
}