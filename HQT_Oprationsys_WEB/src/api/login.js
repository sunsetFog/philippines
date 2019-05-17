import request from '@/utils/request'
import url from '../../static/publicUrl'
// 登录
export function login(that, username, password) {
  return request({
    url: that.public.url + '/backend/account/checklogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: url.url + '/backend/account/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: url.url + '/backend/account/getLoginedInfo',
    method: 'get'
  })
}