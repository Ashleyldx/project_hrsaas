import request from '@/utils/request'

/**
 * 查询企业部门列表
 * @returns
 */
export function getDepartments() {
  return request({
    url: '/company/department' // 默认get不需要写参数
  })
}
/**
 * 删除组织架构的部门
 * @returns
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`, // 接口满足restful接口规范
    method: 'DELETE'
    // 同样的地址 不同的方法执行不同的业务
    // delete 删除业务
    // get 获取业务
    // post 新增或增添业务
    // put 修改业务
  })
}
export function addDepartment(data) {
  return request({
    url: '/company/department', // restful 接口方法同样的地址不同的方法
    method: 'POST',
    data // axios的body参数data
  })
}
