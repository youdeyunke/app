let request = require('../utils/request.js');

// 发送短信验证码   完成
export function sendSms(mobile){
    return request.post("/api/v1/sms",{mobile:mobile});
}

// 短信验证码登录   完成
export function smsAuth(mobile, code){
    return request.post("/api/v1/sms/auth",{mobile:mobile, code: code});
}


// 缺1
// _this.request({
//     url: "/api/v1/sms/sendto",
//     data: {
//         mobile: mobile
//     },