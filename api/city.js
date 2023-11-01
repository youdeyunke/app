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

/** 
 * city模块接口
 * **/

// v1版本的拉取城市  完成
export function getCityListV1 () {
    return request.get("/api/v1/cities/");
}

// v2版本的拉取城市   完成 
export function getCityListV2 () {
    return request.get("/api/v2/cities/");
}

export function getCityListV6 () {
    return request.get("/api/v6/cities/");
}