import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function createComment(data){
  return request({
    url: '/bbs/reply/comment',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data:data
  })
}

export function selectCommentList(query) {
  return request({
    url: '/bbs/reply/comment/list',
    method: 'post',
    data: query
  })
}
