import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'

// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // 请求超时时间
  timeout: 10000
})
service.$source = axios.CancelToken.source()
// request拦截器
service.interceptors.request.use(config => {
  config.headers.post['Content-Type'] = 'application/json'
  config.headers.get['Content-Type'] = 'application/json'
  config.cancelToken = service.$source.token

  if (sessionStorage.getItem('token')) {
    config.headers['token'] = sessionStorage.getItem('token');
  }

    
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (!response.data) {
      return Promise.reject(response)
    } else {
      if (!response.data.flag) { // code码 1001会话过期, 1002无权限, 1003其他客户端登录了
        let code = response.data.code
        if ([1001, 1003].indexOf(code) > -1) {
          MessageBox.alert(response.data.msg, {
            confirmButtonText: '确定',
            callback: action => {
              router.replace('/login')
              throw new Error('Whoops!')
            }
          })
          return Promise.reject(response)
        } else if ([1002].indexOf(code) > -1) {
          Message({
            message: '无权限',
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(response)
        } else {
          if (response.data.msg) {
            Message({
              message: response.data.msg,
              type: 'error',
              duration: 3 * 1000
            })
          }
          return Promise.reject(response)
        }
      } else {
        if (response.data.msg) {
          Message({
            message: response.data.msg,
            type: 'success',
            duration: 3 * 1000
          })
        }
        return response.data
      }
    }
  },
  error => {
    // for debug
    // alert('response:error')
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // router.push('请求不到数据或者超时请求重转发到404页面')
    return Promise.reject(error)
  }
)

export default service
