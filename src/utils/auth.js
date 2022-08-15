// 固定用法：持久化的第二种方法，自己封装一个
import Cookies from 'js-cookie'

const TokenKey = 'hrsass-ihrm-token' // 直接修改为自己需要的key:hrsass-ihrm-token

export function getToken() {
  return Cookies.get(TokenKey) // 获取cookies
}

export function setToken(token) {
  return Cookies.set(TokenKey, token) // 设置cookies
}

export function removeToken() {
  return Cookies.remove(TokenKey) // 删除cookies
}
