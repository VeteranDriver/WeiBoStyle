import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import router from '../router/index'

Vue.config.productionTip = false
axios.defaults.timeout = 60000// 响应时间
axios.defaults.headers.post['Accept'] = 'application/json'// 配置请求头
// axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = 'http://test.houduniot.com:8180';   //配置接口地址
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';
// axios.defaults.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域
// axios.defaults.setHeader('Access-Control-Allow-Credentials', true) // 是否允许发送Cookie，ture为运行res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域

// var requestSerializerType = ''
// var axiosParams = {}
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.data) {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
  }
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data.success) {
    return Promise.resolve(res)
  }
  return res
}, (error) => {
  error = error.toString()
  if (error.indexOf('401') !== -1) {
    // token过期
    localStorage.removeItem('userInfo')
    router.push('/Login')
  }
  console.log('网络异常')
  return Promise.reject(error)
})
// 返回一个Promise(发送post请求)
export function fetchPost (url, params, serializerType) {
  if (params) {
    if (serializerType === 'http') {
      url = url + '?' + qs.stringify(params)
      params = null
    }
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, params, serializerType) {
  if (params) {
    if (serializerType === 'http') {
      url = url + '?' + qs.stringify(params)
      params = null
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function postHeader (key, value) {
  axios.defaults.headers.post[key] = value
}

export function commonHeader (key, value) {
  axios.defaults.headers.common[key] = value
}
export default {
  fetchPost,
  fetchGet,
  postHeader,
  commonHeader
}
