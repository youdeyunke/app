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

/**
 * 楼盘动态模块
 */

// 查询动态列表
export function getEventList (query) {
    return request.get("/api/v6/events", query);
}

// 查询动态详情
export function getEventDetail (eventId) {
    return request.get("/api/v6/events/" + eventId);
}

// 查询动态分类列表
export function getEventCatList () {
    return request.get("/api/v6/event_cats");
}

//拉取我订阅的楼盘动态列表
export function getMineFollowPostList (query) {
    return request.get("/api/v6/event_followers/mine", query);
}