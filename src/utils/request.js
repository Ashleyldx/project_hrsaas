import axios from 'axios'
import { Message } from 'element-ui' // 引入饿了么弹窗提示
// create an axios instance
const service = axios.create({ // 变量使用
  baseURL: process.env.VUE_APP_BASE_API, // 根据env.development变化，此时是开发环境
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(() => {

})

// response interceptor // 从哪抓取的数据？？？
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message) // ??????
    return Promise.reject(new Error(message))
  }
}, (err) => {
  Message.error(err.message) || '' // 或者默认为空值 //// ??????????
  return Promise.reject(err)
})

export default service // 导出axios实例
