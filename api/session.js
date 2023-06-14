let request = require('../utils/request.js');


// 微信手机号码授权登录
// 必须传递对应的3个参数  1
export function  wechatLoginV2( code, encryptedData, iv){
    return request.post("/api/v2/sessions", {code: code, iv: iv, encryptedData: encryptedData})
}