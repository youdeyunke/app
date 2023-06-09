let request = require('../utils/request.js');

/** 
 * 消息模块接口
 * **/

// 发送消息接口
export function sendTextMessage(content, receiverId ){
    var data  = {content: content, content_type: 'text', receiver_id: receiverId}
    return request.post("/api/v1/messages/" , data);
}

// 拉取历史消息列表
export function getOlderMessageList(targetId, firstId){
    var query = {target_id: targetId, first_id: firstId}
    return request.get("/api/v1/messages/" , query );
}


// 标记全部已读
export function markReadAll(){
    return request.post("/api/v1/chat_lists/readall"  );
}

// 删除一个会话
export function deleteChat(chatId){
    return request.destroy("/api/v1/chat_lists/" + chatId  );
}

// 拉取会话列表
export function getChatList(query={}){
    return request.get("/api/v1/chat_lists/", query  );
}









