let request = require('../utils/request.js');


// 拉取收藏列表  1
export function getFavList(query) {
    return request.get("/api/v1/favs", query);
}
// 添加收藏   1
export function  createFav(targetType, targetId){
    return request.post("/api/v1/favs", {target_type: targetType, target_id: targetId});
}