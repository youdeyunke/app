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

// 拉取跟进日志
export function getCustomerFollows (data) {
  return request.get("/api/v6/coustomer_follows", data);
}

// 创建跟进日志
export function createCustomerFollow (data) {
  return request.post("/api/v6/coustomer_follows/create", data);
}