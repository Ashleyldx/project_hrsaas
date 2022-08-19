import request from '@/utils/request'

/**
 * 登录
 * @param {*} data
 * @returns
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 *
 * @returns 获取用户资料接口
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/**
 * 保存员工基本信息
 * @param
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`

  })
}

