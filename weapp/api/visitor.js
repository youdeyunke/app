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
 * visitor模块相关api
 * **/

// 根据条件拉取visitors列表   1 
export function getVisitorList (query) {
    return request.get("/api/v1/visitors/", query);
}


// 创建一个visitor  1
export function createVisitor () {
    return request.post("/api/v6/visitors");
}




// 记录一个visitor的行为   1
export function createVisitorAction (uid, actionName, seconds) {
    return request.post("/api/v6/visitor_actions", {
        uid: uid,
        name: actionName,
        seconds: seconds,
    });
}