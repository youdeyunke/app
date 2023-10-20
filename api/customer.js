let request = require('../utils/request.js');

/** 客户报备模块 */


// 扫码确认带看   1 暂时不写
export function confirmCustomer(data) {
    return request.post("/api/v1/customers/confirm", data);
}


// 提交一个客户报备   1 暂时不写
export function createCustomer(customerData) {
    return request.post("/api/v1/customers", {
        customer: customerData
    });
}

// 查询报备列表   1 暂时不写
export function getCustormerList(query) {
    return request.get("/api/v1/customers", query);
}

// 查询报备详情数据   1 暂时不写
export function getCustomerDetail(customerId) {
    return request.get("/api/v1/customers/" + customerId);
}




// pages/udeve 页面可以删除，app.json
// wx.request({
//     url: 'https://www.udeve.cn/api/v1/customers',
//     method: 'POST',
//     data: data,
//     success: function (resp) {



// 修改报备客户资料    1 暂时不写
export function  updateCustomer(customerId, data){
    return request.put("/api/v1/customers/" + customerId, data);
}