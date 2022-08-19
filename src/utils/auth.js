// 固定用法：持久化的第二种方法，自己封装一个
// 读取时间戳
import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 直接修改为自己需要的key:hrsass-ihrm-token
const timeKey = 'hrsaas-timestamp-key' // 设置一个独一无二的key
export function getToken() {
  return Cookies.get(TokenKey) // 获取cookies
}

export function setToken(token) {
  return Cookies.set(TokenKey, token) // 设置cookies
}

export function removeToken() {
  return Cookies.remove(TokenKey) // 删除cookies
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
