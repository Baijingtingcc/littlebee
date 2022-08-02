import request from '@/utils/request'

export const getReceiving = (params) => {
  return request({
    url: 'ips/receiving/pageDetail',
    method: 'GET',
    params
  })
}
// 收货任务
export const goodsFinish = (data) => {
  return request({
    url: 'ips/receiving/complete',
    method: 'PUT',
    data
  })
}
// 详情
export const getReceiptList = (params) => {
  return request({
    url: 'ips/receiptList/pageDetail',
    method: 'GET',
    params
  })
}
