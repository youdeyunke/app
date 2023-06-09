let request = require('../utils/request.js');

// 更新预定状态接口   完成
export function updateBookingStatus(bookingId, status){
    return request.put("/api/v1/booking_logs/" + bookingId, {status: status});
}

// 增加预约  完成
export function createBooking (bookingData){
    return request.post("/api/v1/booking_logs/", {booking_log: bookingData});
}


// 拉取预约列表 完成
export function getBookingList (query){
    return request.get("/api/v1/booking_logs/", query);
}

// 根据状态查询预约结果
export function getBookingListFromStatus (tab){
    return request.get("/api/v1/booking_logs/", {status: tab});
}

