let request = require('../utils/request.js');

/** 
 * need模块相关api
 * **/

// 拉取need列表    1
export function getNeedList(query={}){
    return request.get("/api/v1/needs/", query);
}
