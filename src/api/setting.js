import request from '@/utils/request'

/**
 *
 * @param {*} params
 * @returns
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
