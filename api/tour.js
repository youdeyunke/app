/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
let request = require('../utils/request');

/** 
 * 活动模块接口
 * **/

// 拉取活动列表   1
export function getTourList (query) {
    return request.get("/api/v6/tours/", query);
}

// 刪除活动成员（取消报名）1
export function deleteTourMember (tourId) {
    return request.destroy("/api/v6/tour_members/" + tourId);
}

// 创建活动成员（报名参加活动）  1
export function createTourMember (data) {
    return request.post("/api/v6/tour_members/join", data);
}

// 拉取活动详情   1
export function getTourDetail (tourId, query = {}) {
    return request.get("/api/v6/tours/" + tourId, query);
}


// 互动签到（此功能已废弃)
export function tourSign (data) {
    return request.post("/api/v1/tours/", data);
}

// 领取活动优惠券   1
export function createTourCoupon (data) {
    return request.post("/api/v6/tour_coupons/", data);
}



// 功能已经删除
// app.request({
//     url: '/api/v1/tour_sign/',
//     method: 'POST',
//     data: data,
//     success: function(resp){ 