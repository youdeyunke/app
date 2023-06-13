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
