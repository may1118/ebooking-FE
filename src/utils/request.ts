import axios from 'axios';
import qs from 'qs'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    // 加上cookie
    if(config.method === 'post' || config.method === 'POST') {
      config.data = qs.stringify(config.data);
    }

    return config;
  },
  error => {
    console.log('err' + error);
    return Promise.reject(error);
  }
)
/**
 * 基于所有的返回信息的内容都是进行一层解包，只返回成功的data，失败的console提示
 * {
 *     "status": ,
 *     "msg": ,
 *     "data": 
 * }
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code === 0){
      // 证明请求成功，直接返回data里面的信息
      return Promise.resolve(res.data);
    } else{
      console.log('request fail ' + res.msg)
      return Promise.reject(res.msg)
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service;