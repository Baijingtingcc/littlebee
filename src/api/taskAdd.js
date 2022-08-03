import request from '@/utils/request'

export const getGroundingList = (params) => {
  return request({
    url: 'ips/grounding/pageDetail',
    method: 'GET',
    params
  })
}
// 查看详情
export const getReceiptList = (params) => {
  return request({
    url: 'ips/receiptList/pageDetail',
    method: 'GET',
    params
  })
}
// 进度条数据
export const getSum = (id) => {
  return request({
    url: `ips/receiptList/sum/${id}`,
    method: 'GET'
  })
}
