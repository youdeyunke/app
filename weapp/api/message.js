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
 * 消息模块接口
 * **/

// 发送消息接口
export function sendTextMessage (content, receiverId) {
    var data = { content: content, content_type: 'text', receiver_id: receiverId }
    return request.post("/api/v6/messages", data);
}

// 拉取历史消息列表
export function getMessageList (data) {
    return request.get("/api/v6/messages", data);
}


// 标记全部已读
export function markReadAll () {
    return request.post("/api/v6/chat_list/readall");
}

// 标记系统消息全部已读
export function markSysReadAll () {
  return request.post("/api/v6/sys_message_list/readall");
}

// 删除一个会话
export function deleteChat (chatId) {
    return request.destroy("/api/v6/chat_list/" + chatId);
}

// 拉取会话列表
export function getChatList (query = {}) {
    return request.get("/api/v6/chat_list", query);
}

// 拉取系统消息
export function getSysMessage (data) {
  return request.get("/api/v6/sys_message_list", data);
}

// 标记系统消息已读
export function markSysMesRead (id) {
  return request.post("/api/v6/sys_message_list/marker_read/" + id);
}

// 拉取系统消息详情
export function getSysMessageDetail (id) {
  return request.get("/api/v6/sys_message/" + id);
}

// 删除一个系统通知
export function deleteSysMes (chatId) {
  return request.destroy("/api/v6/sys_message/" + chatId);
}