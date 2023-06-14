let request = require('../utils/request.js');


// 拉取地图标记点  1
export function  getMapMarkerList(query){
    return request.post("/api/v1/map_markers", query);
}


export function geocoder(latitude, longitude){
    return request.post("/api/v1/geocoder", {latitude:latitude, longitude:longitude});

}