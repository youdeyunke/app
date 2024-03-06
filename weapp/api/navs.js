/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

/** 
 * navs模块接口
 * **/

// 根据位置拉取拉取nav详细信息  完成 
export function getNavFromPosition (positionId) {
    return request.get("/api/v6/navs/", { position_id: positionId });
}
export function getDynamicNavs(id) {
  return request.get("/api/v6/dynamic_navs/" + id);
}

