import axios from 'axios'
let qs = require('qs')
const instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:9000   
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(1111,config)
    if(config.method.toLowerCase()=='post'){
    let _con = config.url
    config.url = _con.split('?')[0]
    config.headers = {Accept: "application/json, text/plain, */*",'Content-type':'application/x-www-form-urlencoded'}
    config.data = qs.parse(_con.split('?')[1])
    }
    // console.log(config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log('error')
    return Promise.reject(error);
  });

export default instance