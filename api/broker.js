let request = require('../utils/request.js');

// 拉取置业顾问列表  完成
export function getBrokerList(query) {
    return request.get("/api/v1/brokers/", query);
}

// 拉取置业顾问详情   完成
export function getBrokerDetail(userId) {
    return request.get("/api/v1/brokers/" + userId);
}


// 增加置业顾问主页浏览量    完成
// 注意：这里要传user_id，而不是broker_id
export function updateBrokerViewsCount(userId) {
    return request.post("/api/v1/brokers/view", {
        user_id: userId
    });
}


// 置业顾问申请入驻    完成
export function createBroker(profile) {
    return request.post("/api/v1/brokers/", profile);
}

// 拉取当前登录账号置业顾问申请入驻状态信息   完成
export function checkBrokerStatus() {
    return request.post("/api/v1/brokers/check_status", {});
}

//完成
export function getBrokerShowDetail(query) {
    return request.get("/api/v1/brokers/show", query);
}


// 点赞  完成
export function likeBroker(data) {
    return request.post("/api/v1/brokers/like", data);
}

//  置业顾问付费入驻功能，已经删除
// 缺
// app.request({
//     url: '/api/v1/broker_memberships',
//     success: function (resp) {


// app.request({
//     url: '/api/v1/broker_membership_orders',
//     method: 'POST',
//     data: { pid: pid },
//     success: function (resp) {



// 查询置业顾问分组信息
export function getBrokerGroup(query){
    return request.get("/api/v1/broker_groups", query)
}

