import request from '@/utils/request';

export function getCommentAll() {
  return request({
    method: 'post',
    url: '/api/getCommentHotelAll',
  });
}
