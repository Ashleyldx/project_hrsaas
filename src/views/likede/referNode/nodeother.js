import request from '@/utils/request'
/**
 * 区域列表
 * @param {*} params
 * @returns
 */
export const getRegion = (params) => request({
  url: '/vm-service/region/search',
  params
})
/**
 * 点位搜索
 * @param {*} params
 * @returns
 */
export const searchNode = (params) => request({
  url: '/vm-service/node/search',
  params
})
/**
 * 新增区域
 * @param {*} data
 * @returns
 */
export const addRegion = (data) => request({
  method: 'POST',
  url: '/vm-service/region',
  data
})
/**
 * 修改区域
 * @param {*} data
 * @returns
 */
export const updateRegion = (data) => request({
  method: 'PUT',
  url: `/vm-service/region/${data.id}`,
  data: {
    regionName: data.regionName,
    remark: data.remark
  }
})
/**
 * 删除区域
 * @param {*} id
 * @returns
 */
export const deleteRegion = (id) => request({
  method: 'DELETE',
  url: `/vm-service/region/${id}`
})
/**
 * 获取点位详情
 * @param {*} id
 * @returns
 */
export const getVmList = (id) => request({
  url: `/vm-service/node/vmList/${id}`
})
/**
 * 合作商搜索
 * @param {'*'} params
 * @returns
 */
export const getPartnerList = (params) => request({
  url: '/user-service/partner/search',
  params
})
/**
 * 获取商圈列表
 * @returns
 */
export const getBusinessType = () => request({
  url: '/vm-service/businessType'
})
/**
 * 新增点位
 * @param {*} data
 * @returns
 */
export const addNode = (data) => request({
  method: 'POST',
  url: '/vm-service/node',
  data
})
/**
 * 更改点位
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const updateNode = (id, data) => request({
  method: 'PUT',
  url: `/vm-service/node/${id}`,
  data
})
/**
 * 删除节点
 * @param {*} id
 * @returns
 */
export const deleteNode = (id) => request({
  method: 'DELETE',
  url: `/vm-service/node/${id}`
})
/**
 * 重置合作商密码
 * @param {*} id
 * @returns
 */
export const resetPassword = (id) => request({
  method: 'PUT',
  url: `/user-service/partner/resetPwd/${id}`
})
/**
 * 新增合作商
 * @param {*} data
 * @returns
 */
export const addPartner = (data) => request({
  method: 'POST',
  url: '/user-service/partner',
  data
})
/**
 * 修改合作商
 * @param {*} data
 * @returns
 */
export const updatePartner = (data) => request({
  method: 'PUT',
  url: `/user-service/partner/${data.id}`,
  data
})
/**
 * 删除合作商
 * @param {*} id
 * @returns
 */
export const deletePartner = (id) => request({
  method: 'DELETE',
  url: `/user-service/partner/${id}`
})