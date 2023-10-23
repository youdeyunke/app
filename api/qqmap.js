let request = require('../utils/request');

// 拉取地图数据     完成  没有用到
export function  placeSearch(data){
    var url = "/api/v1/place_search"
    return request.get(url, data);
}