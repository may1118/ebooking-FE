import request from '@/utils/request';

export function getStudyVideo() {
  return request({
    method: 'get',
    url: '/api/studyVideo'
  });
}
