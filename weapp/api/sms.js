/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

// 发送短信验证码   完成
export function sendSms (mobile) {
    return request.post("/api/v6/sms", { mobile: mobile });
}

// 短信验证码登录   完成
export function smsAuth (mobile, code) {
    return request.post("/api/v6/sms/auth", { mobile: mobile, code: code });
}



// 发送手机验证码短信   1  没用到
export function sendTo (mobile) {
    return request.post("/api/v1/sms/sendto", { mobile: mobile });
}