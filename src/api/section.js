import request from '@/utils/request'

export function getSectionAll() {
  return request({
    url: '/bbs/section/all',
    method: 'get'
  })
}
