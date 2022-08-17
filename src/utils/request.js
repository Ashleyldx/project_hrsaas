// 封装单独的登陆接口
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui' // 引入饿了么弹窗提示
// create an axios instance
const service = axios.create({ // 变量使用
  baseURL: process.env.VUE_APP_BASE_API, // 根据env.development变化，此时是开发环境
  timeout: 5000 // request timeout
})

// request interceptor  //请求数据不能为空，和响应拦截器一样都有两个参数
// 参数1：config--请求的配置信息
service.interceptors.request.use(config => {
  // config必须要返回
  // 注入token--通过引入store--为了调用用户资料接口
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, (err) => {
  Message.error(err.message) || '' // 或者默认为空值 //// ??????????
  return Promise.reject(err)
})

export default service // 导出axios实例

