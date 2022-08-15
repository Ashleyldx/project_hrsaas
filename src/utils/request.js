import axios from 'axios'
// create an axios instance
const service = axios.create({ // 变量使用
  baseURL: process.env.VUE_APP_BASE_API, // 根据env.development变化，此时是开发环境
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use()

export default service // 导出axios实例
