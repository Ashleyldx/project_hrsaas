import request from '@/utils/request'

/**
 * 获取公司角色列表接口
 * @param {*} params
 * @returns
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // page页码 pagesize 每页条数，查询参数
  })
}
/**
 * 根据ID查询企业
 * @returns
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`,
    method: 'POST'
  })
}
/**
 * 新增角色
 * @returns
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/**
 * 获取角色详情
 * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
