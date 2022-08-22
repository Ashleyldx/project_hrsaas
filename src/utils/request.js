// 封装单独的登陆接口
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui' // 引入饿了么弹窗提示
import { getTimeStamp } from '@/utils/auth'

const Timeout = 3600 // 定义超时时间
// 定义超时方法二(慧姐)
// 封装判断时间是否超时的函数
// function isCheckTimeOut() {
//   现在的时间 - 获取token的时间 > 定义超时时间 注意单位是秒
// return (Date.now() - store.getters.hrsaasTime) / 1000 > Timeout
// }

const service = axios.create({ // 变量使用
  baseURL: process.env.VUE_APP_BASE_API, // 根据env.development变化，此时是开发环境
  timeout: 5000 // 设置超时时间
})

// request interceptor  //请求数据不能为空，和响应拦截器一样都有两个参数
// 参数1：config--请求的配置信息
service.interceptors.request.use(config => {
  // 注入token--通过引入store--为了调用用户资料接口
  if (store.getters.token) { // 回忆token登录页
    // 只有在有token的情况下才有必要检查时间戳是否超时
    if (isCheckTimeOut()) { // 如果为true表示过期了
      store.dispatch('user/logout') // 登出操作
      router.push('/login')
      // Message.error('token超时')
      // 超时 调用logout
      // 跳往登录页
      // Promise 抛出错误
      return Promise.reject(new Error('token超时'))
      // token 存在
      // 只有在有token的情况下 才有必要去检查时间戳是否超时
      //
    }
    // config 里面加上字段 // 没有超时继续发出请求
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // config必须要返回
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, (error) => {
  // error 信息里的response对象
  // console.log(error)
  // console.log(error.response)
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002时表示请求超时，token失效不处于登录
    store.dispatch('user/login') // 登录action
    router.push('/login')
  } else {
    Message.error(error.message) || '' // 提示默认信息或者默认为空值
    // 此处判断后端接口，报错是否是token的问题
    // 如果是token的问题 直接退出重新登陆 code10002处于失效状态
  }
  return Promise.reject(error)
})
// 是否超时
// 超时逻辑，(当前时间 - 缓存中的时间) 是否大于时间差  // 定义超时方法一
function isCheckTimeOut() {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > Timeout
}
export default service // 导出axios实例

