import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8081/', // url = base url + request url
  timeout: 50000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {

    config.headers.token=localStorage.getItem("token")
    return config;
  }
)
import router from '@/router/index'
// 响应拦截器 
service.interceptors.response.use(
  response => {
    if(response.data.code==403){
      localStorage.removeItem("token")
      router.push('/login')
    }
    return response.data;
  }
)

export default service
