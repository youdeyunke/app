let request = require('../utils/request.js');

/** 
 * visitor模块相关api
 * **/

// 根据条件拉取visitors列表   1
export function getVisitorList(query){
    return request.get("/api/v1/visitors/", query);
}


// 创建一个visitor  1
export function createVisitor(){
    return request.post("/api/v1/visitors/");
}




// 记录一个visitor的行为   1
export function createVisitorAction(uid, actionName, seconds){
    return request.post("/api/v1/visitor_actions/", {
        visitor_uid: uid,
        name: actionName,
        seconds: seconds,
    });
}