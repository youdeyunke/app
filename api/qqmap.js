let request = require('../utils/request');

export function  placeSearch(data){
    var url = "/api/v1/place_search"
    return request.get(url, data);
}