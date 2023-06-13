let request = require('../utils/request.js');

/** 
 * visitor模块相关api
 * **/

// 根据条件拉取visitors列表   1
export function getVisitorList(query){
    return request.get("/api/v1/visitors/", query);
}


// 缺
// this.request({
//     url: '/api/v1/visitors',
//     hideLoading: true,
//     method: 'POST',
//     data: { },
//     success: function (resp) {
// 创建一个visitor
export function createVisitor(){
    return request.post("/api/v1/visitors/");
}




    // this.request({
    //     url: '/api/v1/visitor_actions',
    //     hideLoading: true,
    //     method: 'POST',
    //     data: {
    //         visitor_uid: uid,
    //         name: actionName,
    //         seconds: seconds,
    //     },
    //     success: function (resp) {
// 记录一个visitor的行为
export function createVisitorAction(uid, actionName, seconds){
    return request.post("/api/v1/visitor_actions/", {
        visitor_uid: uid,
        name: actionName,
        seconds: seconds,
    });
}