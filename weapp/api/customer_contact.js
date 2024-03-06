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

// 拉取客户联系人
export function getCustomerContacts (data) {
  return request.get("/api/v6/customer_contacts", data);
}

// 拉取客户联系人详情
export function getCustomerContact (id) {
  return request.get("/api/v6/customer_contacts/" + id);
}

// 创建客户联系人
export function createCustomerContact (data) {
  return request.post("/api/v6/customer_contacts/create", data);
}

// 更新客户联系人
export function updateCustomerContact (id, data) {
  return request.post("/api/v6/customer_contacts/" + id, data);
}

// 删除客户联系人
export function deleteCustomerContact (id) {
  return request.destroy("/api/v6/customer_contacts/" + id);
}