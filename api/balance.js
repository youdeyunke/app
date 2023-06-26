const request =  require('../utils/request.js');


// 查询钱包明细
export function getBalanceList(query){
    return request.get("/api/v6/balances", query);
}

// 查询我的余额
export function getBalanceCount(query){
    return request.get("/api/v6/balances/count", query);
}

// 微信支付充值
export function createBalance(amount){
    return request.post("/api/v6/wxpay/create", {amount: parseInt(amount)});
}