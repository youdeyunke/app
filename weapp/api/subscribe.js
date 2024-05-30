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
let request = require('../utils/request');

// 拉取订阅状态
export function getSubscribeStatus (data) {
	return request.get("/api/v6/subscribe_status", data);
}

// 订阅
export function unsubscribe (data) {
	return request.post("/api/v6/unsubscribe", data);
}

//取消订阅
export function subscribe (data) {
	return request.post("/api/v6/subscribe", data);
}