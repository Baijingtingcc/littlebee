import request from '@/utils/request'

export const getLocation = (params) => {
  return request({
    url: 'api/location/pageDetail',
    method: 'GET',
    params
  })
}
