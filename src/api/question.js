import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getQuestionList(query) {
  return request({
    url: '/bbs/question/page',
    method: 'post',
    data: query
  })
}

export function createQuestion(query) {
  return request({
    url: '/bbs/question/edit',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: query
  })
}

export function selectQuestionDetail(id) {
  return request({
    url: '/bbs/question/select/' + id,
    method: 'get'
  })
}
