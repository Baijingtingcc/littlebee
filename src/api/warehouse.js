import request from '@/utils/request'
// 入库单数据
export const getPageDetail = (params) => {
  return request({
    url: '/ips/receipt/pageDetail',
    params
  })
}
// 仓库管理
export const getWarehouse = (params) => {
  return request({
    url: '/api/warehouse/page',
    params
  })
}
// 生成收货任务
export const postipsReceiving = (data) => {
  return request({
    method: 'POST',
    url: '/ips/receipt/receiving',
    data
  })
}
// 仓库管理 - 修改仓库状态
export const putWarehouseStatus = (queryList) => {
  return request({
    method: 'PUT',
    url: '/api/warehouse',
    data: queryList
  })
}
// 编辑仓库
export const getWarehouseForm = (id) => {
  return request({
    method: 'GET',
    url: `/api/warehouse/${id}`
  })
}
// 新增仓库
export const getCkWarehouse = () => {
  return request({
    url: 'api/codeFactory/next/CK',
    method: 'GET'
  })
}
export const postAddWarehouse = (data) => {
  return request({
    url: 'api/warehouse',
    method: 'POST',
    data
  })
}
