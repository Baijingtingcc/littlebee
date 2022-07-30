import request from '@/utils/request'
// 获取库区的表格数据
export const getReservoir = (params) => {
  return request({
    method: 'GET',
    url: 'api/area/pageDetail',
    params
  })
}
export const getKQReservoir = () => {
  return request({
    method: 'GET',
    url: 'api/codeFactory/next/KQ'
  })
}
export const getWareList = (params) => {
  return request({
    method: 'GET',
    url: 'api/warehouse/list',
    params
  })
}
export const getAddResservoir = (data) => {
  return request({
    method: 'POST',
    url: 'api/area',
    data
  })
}
export const getCurrent = (id) => {
  return request({
    method: 'GET',
    url: `api/area/${id}`
  })
}
