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

/** 客户报备模块 */


// 扫码确认带看   1 暂时不写
export function confirmCustomer (data) {
    return request.post("/api/v1/customers/confirm", data);
}


// 提交一个客户报备   1 暂时不写
// export function createCustomer (customerData) {
//     return request.post("/api/v1/customers", {
//         customer: customerData
//     });
// }

// 查询报备列表   1 暂时不写
// export function getCustormerList (query) {
//     return request.get("/api/v1/customers", query);
// }

// 查询报备详情数据   1 暂时不写
export function getCustomerDetail (customerId) {
    return request.get("/api/v1/customers/" + customerId);
}

// 修改报备客户资料    1 暂时不写
export function updateCustomer (customerId, data) {
    return request.put("/api/v1/customers/" + customerId, data);
}


// 拉取客户列表
export function getCustormersList (query) {
  return request.get("http://192.168.31.45:8080/api/v6/customers", query);
}

// 拉取客户详情
export function getCustormer (id) {
  return request.get("http://192.168.31.45:8080/api/v6/customers/" + id);
}

// 将私人客户放回公海
export function releaseCustomer (id, data) {
  return request.post("http://192.168.31.45:8080/api/v6/customers/" + id + "/release", data);
}

// 领取公海客户
export function recieveCustomer (id) {
  return request.post("http://192.168.31.45:8080/api/v6/customers/" + id + "/recieve");
}

// 创建客户
export function createCustomer(data) {
  return request.post("http://192.168.31.45:8080/v6/customers/create", data)
}