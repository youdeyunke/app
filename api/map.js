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


// 拉取地图标记点  1
export function getMapMarkerList (query) {
    return request.post("/api/v6/map_markers", query);
}

// 1 未找到用的地方
export function geocoder (latitude, longitude) {
    return request.post("/api/v1/geocoder", { latitude: latitude, longitude: longitude });
}

