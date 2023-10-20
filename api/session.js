let request = require('../utils/request.js');


// 微信手机号码授权登录
// 必须传递对应的3个参数  1
export function wechatLogin( code, encryptedData, iv){
    return request.post("http://localhost:8080/api/v6/sessions", {code: code, iv: iv, encrypted_data: encryptedData})
}