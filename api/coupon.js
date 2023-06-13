let request = require('../utils/request.js');
/**
 * 优惠券模块
 */


// 查询优惠券列表   1
export function getCouponList(query){
    return request.get("/api/v1/coupons", query);
}


// 更新优惠券    1
export function updateCoupon(couponId, data){
    return request.put("/api/v1/coupons/" + couponId, data);
}

// 查询优惠券详情    1
export function  getCouponDetail(couponId){
    return request.get("/api/v1/coupons/" + couponId);
}



// 删除卡券  1
export function  deleteCoupon(couponId){
    return request.destroy("/api/v1/coupons/" + couponId);
}