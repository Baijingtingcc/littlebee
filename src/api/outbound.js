import request from '@/utils/request'
// 获取入库单号
export const getAddPK = () => {
  return request({
    url: 'api/codeFactory/next/RK',
    method: 'GET'
  })
}
// 获取货主数据
export const getOwner = (params) => {
  return request({
    url: '/api/owner/list',
    method: 'GET',
    params
  })
}
// 获取货主id
export const getOwerId = (params) => {
  return request({
    url: 'ips/receiving/pageDetail',
    method: 'GET',
    params
  })
}
// 获取仓库信息
export const getWareHouse = (params) => {
  return request({
    url: 'api/warehouse/list',
    method: 'GET',
    params
  })
}
// 提交信息
export const postOutBound = (data) => {
  return request({
    url: 'ips/receipt',
    method: 'POST',
    data
  })
}
// 查看详情
export const getCurrentOut = (id) => {
  console.log(id)
  return request({
    url: `ips/receipt/detail/${id}`
  })
}
// 详情数据
export const getOutBound = (params) => {
  return request({
    url: 'ips/receiptList/pageDetail',
    params
  })
}
// 货品
export const getGoods = (params) => {
  return request({
    url: 'api/goods/pageDetail',
    params
  })
}
// 添加货品
export const postAddGoods = (data) => {
  return request({
    method: 'POST',
    url: 'ips/receiptList/batch',
    data
  })
}
// 取消入库单
export const delOutBound = (data) => {
  return request({
    method: 'PUT',
    url: 'ips/receipt/cancel',
    data
  })
}
// 修改详情
export const editCurrent = (id) => {
  return request({
    method: 'GET',
    url: `ips/receipt/${id}`
  })
}
// 修改详情
export const editCurrentPut = (data) => {
  return request({
    method: 'PUT',
    url: 'ips/receipt',
    data
  })
}
