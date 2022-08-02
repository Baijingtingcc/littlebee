import request from '@/utils/request'

export const getGroundingList = (params) => {
  return request({
    url: 'ips/grounding/pageDetail',
    method: 'GET',
    params
  })
}
