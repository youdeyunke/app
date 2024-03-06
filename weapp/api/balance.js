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
const request = require('../utils/request.js');


// 查询钱包明细
export function getBalanceList (query) {
    return request.get("/api/v6/balances", query);
}

// 查询我的余额
export function getBalanceCount (query) {
    return request.get("/api/v6/balances/count", query);
}

// 微信支付充值
export function createBalance (amount) {
    return request.post("/api/v6/wxpay/create", { amount: parseInt(amount) });
}