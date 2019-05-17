import {
  request
} from '@/utils/request'
import url from '@/utils/publicUrl'

export function login(that, username, password) {
  return request({
    url: that.public.url + '/account/checklogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: url.url + '/account/logout',
    method: 'post',
    data: {
    }
  })
}

export function getUserInfo() {
  return request({
    url: '/user/getUserInfo/',
    method: 'get'
  })
}
