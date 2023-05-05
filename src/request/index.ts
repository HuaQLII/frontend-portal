import axios from "axios";
//创建axios实例

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});
// request拦截器
service.interceptors.request.use((config) => {
    // Do something before request is sent
    config.headers = config.headers || {};
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config;

});
// respone拦截器
service.interceptors.response.use(
    (response) => {
        const code: number = response.data.code;
        if (code !== 200) {
            return Promise.reject('error' + response.data);
        }
        return response.data;
    }, (err) => {
        console.log(err);
    }
);
export default service;