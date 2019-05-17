import axios from 'axios'
import {
  Toast
} from 'mint-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API + process.env.PREFIX, // api的base_url
  // timeout: 50000, // request timeout
  // withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['x-token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 0) {
      Toast({
        message: res.message,
        // type: 'error'
      })

      if (res.code === 40001) {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject('error')
    } else {
      // Message({
      //   message: res.message,
      //   type: 'success'
      // })
      return response.data
    }
  },
  error => {
    Toast({
      message: error.message,
      // type: 'error'
    })
    return Promise.reject(error)
  }
)

export {
  service as request
}
