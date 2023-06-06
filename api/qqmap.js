let request = require('../utils/request');

// 拉取地图数据     已完成
export function  placeSearch(data){
    var url = "/api/v1/place_search"
    return request.get(url, data);
}