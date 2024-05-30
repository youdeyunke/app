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
//
export function getHouseList (data) {
    return request.get("/api/v6/houses", data);
}
// 发布二手房
export function createHouse (data) {
    return request.post("/api/v6/houses", data);
}

// 拉取楼盘详情页模块数据
export function getHouseBlocks (pid) {
    return request.get("/api/v6/houses/" + pid);
}

// 拉取楼盘筛选条件
export function getHouseFilter (busi) {
    return request.get("/api/v6/house_filters?business=" + busi);
}
