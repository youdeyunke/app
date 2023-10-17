let request = require('../utils/request.js');

/**
 * 楼盘动态模块
 */

// 查询动态列表  1
export function getEventList(query) {
    return request.get("/api/v6/events", query);
}

// 查询动态详情    未发现
export function getEventDetail(eventId) {
    return request.get("/api/v1/events/" + eventId);
}

// 发布动态   1
export function createEvent(data) {
    return request.post("/api/v1/events", {
        event: data,
        push: false
    });
}

// 查询动态分类列表   1
export function getEventCatList() {
    return request.get("/api/v1/event_cats");
}

// 取消关注动态     1
// TODO 需要优化此接口 
export function deleteEventFollow(postId) {
    return request.destroy("/api/v6/event_followers/0", {
        post_id: postId
    });
}

// 关注楼盘动态        1
export function createEventFollow(postId) {
    return request.post("/api/v6/event_followers", {
        post_id: postId
    });
}


// 删除一条动态 1
export function deleteEvent(eid){
    return request.destroy("/api/v1/events/" + eid);
}


//拉取我订阅的楼盘动态列表   1
export function getMineFollowPostList(query){
    return request.get("/api/v6/event_followers/mine",query);
}