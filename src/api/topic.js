import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function editTopic(data) {
  return request({
    url: '/bbs/topic/edit',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data:data
  })
}

export function getTopicList(data) {
  return request({
    url: '/bbs/topic/page',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data:data
  })
}
