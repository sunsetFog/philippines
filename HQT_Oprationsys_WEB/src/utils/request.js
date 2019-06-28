import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from './auth';

// 创建axios实例
const service = axios.create({
  // baseURL: location.protocol + '//' + location.host, // api 的 base_url
  // timeout: 10000, // 请求超时时间
})

service.interceptors.request.use(
  config =>{
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
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
    if (res.code !== 0 && res.code !== 40001 && res.code !== 40000 && res.code !== 39999 && res.code !== 49999) {
      Message({
        message: res.message,
        type: 'error'
      })

    } else if (res.code === 49999) {
      Message({
        message: res.message +''+ res.data,
        type: 'error'
      })
    } else if (res.code === 40001) {
      MessageBox.alert(
        '您长时间未操作系统，为保证您账户的安全，请你重新登录',
        '确定登出',
        {
          confirmButtonText: '确定',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject('error')
    }  else if (res.code === 40000) {
      MessageBox.alert(
        '账号在别处登录，为保证您账户的安全，请你重新登录',
        '确定登出',
        {
          confirmButtonText: '确定',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject('error')
    } else if (res.code === 39998) {
      MessageBox.alert(
        '权限已变更',
        '确定登出',
        {
          confirmButtonText: '确定',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject('error')
    } else if (res.code === 39999) {
      MessageBox.alert(
        '为保证您账户的安全，修改密码后，请你重新登录',
        '确定登出',
        {
          confirmButtonText: '确定',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
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
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
