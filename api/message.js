let request = require('../utils/request.js');

/**
 * 消息模块接口
 * **/

// 发送消息接口
export function sendTextMessage(content, receiverId ){
    var data  = {content: content, content_type: 'text', receiver_id: receiverId}
    return request.post("http://localhost:8080/api/v6/messages" , data);
}

// 拉取历史消息列表
export function getMessageList(data){
    return request.get("http://localhost:8080/api/v6/messages" , data);
}


// 标记全部已读
export function markReadAll(){
    return request.post("http://localhost:8080/api/v6/chat_list/readall"  );
}

// 删除一个会话
export function deleteChat(chatId){
    return request.destroy("http://localhost:8080/api/v6/chat_list/" + chatId  );
}

// 拉取会话列表
export function getChatList(query={}){
    return request.get("http://localhost:8080/api/v6/chat_list", query  );
}
