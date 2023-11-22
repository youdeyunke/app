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
let request = require('../utils/request');

// 拉取线索列表
export function getThreadList (query) {
  return request.get("/api/v6/threads", query);
}

// 拉取线索详情
export function getThreads (id) {
  return request.get("/api/v6/threads/" + id);
}

// 拉取线索的所有子线索
export function getSubThreads (parentId) {
  return request.get("/api/v6/threads/" + parentId + "/subthreads");
}

// 将个人线索放回公海
export function releaseThreads (id, data) {
  return request.post("/api/v6/threads/" + id + "/release", data);
}

// 领取公海线索
export function recieveThreads (id) {
  return request.post("/api/v6/threads/" + id + "/recieve");
}

// 将线索转为客户
export function threadToCustomer (id) {
  return request.post("/api/v6/threads/" + id + "/tocustomer");
}