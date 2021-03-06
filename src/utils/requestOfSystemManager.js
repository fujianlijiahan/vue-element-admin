import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API_OF_SYS_MANAGE, // api的base_url
  timeout: 100000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  store.dispatch('setSaveDisabledActions', true)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (!res.success) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 401:Token 过期了;
      if (response.status === 401) {
        // 重新获得token
      }
      // 50008:非法的token; 50012:其他客户端登录了;
      if (res.code === 50008 || res.code === 50012 || response.status === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      store.dispatch('setSaveDisabledActions', false)
      return response
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 封装post请求
 * @param url
 * @param data
 */
export function post(url, data) {
  return service({
    url: url,
    method: 'post',
    data: data
  })
}

/**
 * 封装get请求
 * @param url
 * @param data
 */
export function get(url, data) {
  url += '?'
  var objKeys = Object.keys(data)
  for (var i = 0; i < objKeys.length; i++) {
    if (i < objKeys.length - 1) {
      url = url + objKeys[i] + '=' + data[objKeys[i]] + '&'
    } else {
      url = url + objKeys[i] + '=' + data[objKeys[i]]
    }
  }
  return service({
    url: url,
    method: 'get'
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 */
export function del(url, data) {
  return service({
    url: url,
    method: 'delete',
    data: data
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 */
export function put(url, data) {
  return service({
    url: url,
    method: 'put',
    data: data
  })
}

/**
 * 封装http请求
 * @param url
 * @param data
 */
export function http(obj) {
  return service({
    url: obj.url,
    method: obj.method,
    data: obj.data
  })
}

export default service
