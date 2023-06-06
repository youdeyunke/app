let request = require('../utils/request.js');

export function  placeSearch(data){
    var url = "https://apis.map.qq.com/ws/place/v1/search"
    return request.get(url, data);
}

export function  geocoder(data){
    var url = 'https://apis.map.qq.com/ws/geocoder/v1/'
    return request.get(url, data);
}