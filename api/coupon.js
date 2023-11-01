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
let request = require('../utils/request.js');
/**
 * 优惠券模块
 */


// 查询优惠券列表   1
export function getCouponList (query) {
    return request.get("/api/v6/coupons", query);
}


// 更新优惠券    1
export function updateCoupon (couponId, data) {
    return request.put("/api/v6/coupons/" + couponId, data);
}

// 查询优惠券详情    1
export function getCouponDetail (couponId) {
    return request.get("/api/v6/coupons/" + couponId);
}



// 删除卡券  1
export function deleteCoupon (couponId) {
    return request.destroy("/api/v6/coupons/" + couponId);
}