let request = require('../utils/request.js');

// 发送短信验证码
export function sendSms(mobile){
    return request.post("/api/v1/sms",{mobile:mobile});
}

// 短信验证码登录
export function smsAuth(mobile, code){
    return request.post("/api/v1/sms/auth",{mobile:mobile, code: code});
}