
let request = require('../utils/request.js');

// 拉取置业顾问列表  完成
export function getBrokerList(query){
    return request.get("/api/v1/brokers/", query);
}

// 拉取置业顾问详情   完成
export function getBrokerDetail(userId){
    return request.get("/api/v1/brokers/" + userId);
}


// 增加置业顾问主页浏览量    完成
// 注意：这里要传user_id，而不是broker_id
export function updateBrokerViewsCount(userId){
    return request.post("/api/v1/brokers/view", {user_id:userId});
}


// 置业顾问申请入驻    完成
export function createBroker(profile){
    return request.post("/api/v1/brokers/", profile);
}

// 拉取当前登录账号置业顾问申请入驻状态信息   完成
export function checkBrokerStatus(){
    return request.post("/api/v1/brokers/check_status", {});
}

//完成
export function getBrokerShowDetail(query){
    return request.get("/api/v1/brokers/show", query);
}


// 点赞  完成
export function likeBroker(data){
    return request.post("/api/v1/brokers/like", data);
}