let request = require('../utils/request.js');

// 拉取置业顾问列表  完成
export function getBrokerList(query) {
    return request.get("/api/v6/brokers/", query);
}

// 拉取置业顾问详情   完成
export function getBrokerDetail(userId) {
    return request.get("http://localhost:8080/api/v6/brokers/" + userId);
}

// 根据楼盘id拉取一个默认置业顾问详情   完成
export function getPostDefaultBrokerDetail(query) {
  return request.get("/api/v6/brokers/postDefault", query);
}

// 增加置业顾问主页浏览量    完成
// 注意：这里要传user_id，而不是broker_id
export function updateBrokerViewsCount(userId) {
    return request.post("http://localhost:8080/api/v6/brokers/view", {
        user_id: userId
    });
}


// 置业顾问申请入驻    完成
export function createBroker(profile) {
    return request.post("/api/v6/brokers", profile);
}

// 拉取当前登录账号置业顾问申请入驻状态信息   完成
export function checkBrokerStatus() {
    return request.post("/api/v6/brokers/check_status", {});
}

//完成
export function getBrokerShowDetail(query) {
    return request.get("http://localhost:8080/api/v6/brokers/show", query);
}


// 点赞  完成
export function likeBroker(data) {
    return request.post("http://localhost:8080/api/v6/brokers/like", data);
}

// 查询置业顾问分组信息  1
export function getBrokerGroup(query){
    return request.get("/api/v1/broker_groups", query)
}


