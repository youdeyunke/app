/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 1000 * 90 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        console.log('service. config is', config)

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.

        // status == 1 弹出错误提示文字
        if (res.code === 1) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
        }

        // 回话过期,重新登录
        if (res.code === 2000) {
            // to re-login
            MessageBox.confirm('账号已经退出', '退出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                showCancelButton: false,
                showClose: false,
                closeOnClickModal: false,
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                })
            })
            return Promise.reject('请重新登录')
        }
        return res
    },

    error => {
      console.log('err' + error)
      let { message } = error;
      if (message == "Network Error") {
        message = "后端接口连接异常";
      }
      else if (message.includes("timeout")) {
        message = "系统接口请求超时";
      }
      else if (message.includes("Request failed with status code")) {
        message = error.response.data.message
        // message = "系统接口" + message.substring(message.length - 3) + "异常";
      }

        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error.response.data)
    }
)

export default service
