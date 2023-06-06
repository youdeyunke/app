const baseUrl = 'http://192.168.31.66:2021';

// 发送http请求
const http = ({ url = '', param = {}, ...other } = {}) => {
    let headers={
      'content-type': 'application/json',
    }
    // if (wx.getStorageSync('token')){
    //   headers.Authorization = "Bearer "  + wx.getStorageSync('token');
    // }
    return new Promise((resolve, reject) => {
      wx.request({
        url: getUrl(url),
        data: param,
        header: headers,
        ...other,
        complete: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode == 500 || res.statusCode == 422) {
            resolve(res.data)
          } else {
            reject(res)
          }
        }
      })
    })
  }

// 判断是否走封装的请求
const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
      url = baseUrl + url;
    }
    return url
  }


// get请求
const get = (url, param = {}) => {
    return http({
      url,
      param
    })
  }
//   post请求
  const post = (url, param = {}) => {
    return http({
      url,
      param,
      method: 'post'
    })
  }
  const put = (url, param = {}) => {
    return http({
      url,
      param,
      method: 'put'
    })
  }
  
  const _delete = (url, param = {}) => {
    return http({
      url,
      param,
      method: 'put'
    })
  }
  module.exports = {
    baseUrl,
    get,
    post,
    put,
    _delete
  }