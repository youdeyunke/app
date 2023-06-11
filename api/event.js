let request = require('../utils/request.js');

/**
 * 楼盘动态模块
 */


// 查询动态列表
export function getEventList(query){
    return request.get("/api/v1/events", query);
}

// 查询动态详情
export function  getEventDetail(eventId){
    return request.get("/api/v1/events/" + eventId);
}

// 发布动态
export function createEvent(data){
    return request.post("/api/v1/events", {event:data, push: false});
}

// 查询动态分类列表
export function  getEventCatList(){
    return request.get("/api/v1/event_cats");
}

// 取消关注动态
// TODO 需要优化此接口
export function  deleteEventFollow(followId, postId){
    return request.destroy("/api/v1/event_followers/" + followId, {post_id: postId});
}

// 关注楼盘动态
// TODO 需要优化关注楼盘动态功能
export function createEventFollow(postId){
    return request.post("/api/v1/event_followers", {post_id: postId});
}
