let request = require('../utils/request.js');

/** 
 * 活动模块接口
 * **/

// 拉取活动列表
export function getTourList(query) {
    return request.get("/api/v1/tours/", query);
}

// 刪除活动成员（取消报名）1
export function deleteTourMember(data) {
    return request.destroy("/api/v1/tour_members/0", data);
}

// 创建活动成员（报名参加活动）  1
export function createTourMember(data) {
    return request.post("/api/v1/tour_members/", data);
}

// 拉取活动详情
export function getTourList(tourId) {
    return request.post("/api/v1/tours/" + tourId);
}


// 互动签到（此功能已废弃)
export function tourSign(data) {
    return request.post("/api/v1/tours/", data);
}

// 领取活动优惠券
export function createTourCoupon(data) {
    return request.post("/api/v1/tour_coupons/", data);
}

// 缺1
// app.request({
//     url: '/api/v1/tours/' + _this.data.tourId + '?broker_id=' + bid,
//     success: function (resp) {


// 缺2
// app.request({ 
//     url: '/api/v1/tours/' + hid, 
//     success: function(res){ 


// app.request({
//     url: '/api/v1/tour_members/0',
//     method: 'DELETE',
//     data: data,
//     success: function (resp) {

// app.request({ 
//     url: '/api/v1/tour_sign/', 
//     method: 'POST', 
//     data: data, 
//     success: function(resp){ 