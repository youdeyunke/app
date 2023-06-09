let request = require('../utils/request.js');

// 更新预定状态接口
export function updateBookingStatus(bookingId, status){
    return request.put("/api/v1/booking_logs/" + userId, {status: status});
}

// 增加预约
export function createBooking (bookingData){
    return request.post("/api/v1/booking_logs/", {booking_log: bookingData});
}


// 拉取预约列表
export function getBookingList (query){
    return request.get("/api/v1/booking_logs/", query);
}

// 根据状态查询预约结果
export function getBookingListFromStatus (tab){
    return request.get("/api/v1/booking_logs/", {status: tab});
}

