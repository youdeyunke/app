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


// 拉取收藏状态
export function getFavStatus (query) {
    return request.get("/api/v6/favs", query);
}
// 添加收藏 
export function createFav (targetType, targetId) {
    return request.post("/api/v6/favs", { target_type: targetType, target_id: targetId });
}