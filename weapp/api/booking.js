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

// 更新预定状态接口   完成
export function updateBookingStatus (bookingId, status) {
    return request.put("/api/v1/booking_logs/" + bookingId, { status: status });
}

// 增加预约  完成
export function createBooking (bookingData) {
    return request.post("/api/v6/booking_logs", bookingData);
}

// 拉取楼盘可预约时间
export function getPostBookingConfig (id) {
    return request.get("/api/v6/booking_config/"+ id);
}


// 拉取预约列表 完成
export function getBookingList (query) {
    return request.get("/api/v1/booking_logs/", query);
}

// 根据状态查询预约结果 1
export function getBookingListFromStatus (tab) {
    return request.get("/api/v6/booking_logs/", { status: tab });
}

