let request = require('../utils/request.js');


// 拉取地图标记点  1
export function  getMapMarkerList(query){
    return request.post("/api/v6/map_markers", query);
}

// 1 未找到用的地方
export function geocoder(latitude, longitude){
    return request.post("/api/v1/geocoder", {latitude:latitude, longitude:longitude});
}

