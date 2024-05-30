/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

// 拉取置业顾问列表  完成
export function getBrokerList (query) {
    return request.get("/api/v6/brokers/", query);
}

// 拉取一个楼盘下所有置业顾问列表  完成
export function getPostBrokerList (pid) {
  return request.get("/api/v6/post_brokers/"+ pid);
}

// 拉取置业顾问详情   完成
export function getBrokerDetail (userId) {
    return request.get("/api/v6/brokers/" + userId);
}

// 根据楼盘id拉取一个默认置业顾问详情   完成
export function getPostDefaultBrokerDetail (query) {
    return request.get("/api/v6/brokers/postDefault", query);
}

// 增加置业顾问主页浏览量    完成
// 注意：这里要传user_id，而不是broker_id
export function updateBrokerViewsCount (userId) {
    return request.post("/api/v6/brokers/view", {
        user_id: userId
    });
}


// 置业顾问申请入驻    完成
export function createBroker (profile) {
    return request.post("/api/v6/brokers", profile);
}

// 拉取当前登录账号置业顾问申请入驻状态信息   完成
export function checkBrokerStatus () {
    return request.post("/api/v6/brokers/check_status", {});
}

//完成
export function getBrokerShowDetail (query) {
    return request.get("/api/v6/brokers/show", query);
}


// 点赞  完成
export function likeBroker (data) {
    return request.post("/api/v6/brokers/like", data);
}



