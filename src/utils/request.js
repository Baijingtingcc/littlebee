import axios from 'axios'
const request = axios.create() // 创建一个axios的实例
request.interceptors.request.use() // 请求拦截器
request.interceptors.response.use() // 响应拦截器
export default request // 导出axios实例
