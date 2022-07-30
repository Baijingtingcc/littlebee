import request from '@/utils/request'
// 待办信息的数据
export const getBacklog = () => {
  return request({
    url: '/ips/home/todo'
  })
}
// 柱状图的信息数据
export const getHistogramList = (day) => {
  return request({
    url: `/ips/home/sumList?dimension=${day}`
  })
}
// 库存使用情况
export const getStockStatus = () => {
  return request({
    url: '/ips/home/stockUseStatus'
  })
}
// 饼状图 库区使用情况
export const getAreaStatus = () => {
  return request({
    url: '/ips/home/areaUseStatus'
  })
}
