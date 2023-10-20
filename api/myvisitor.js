let request = require('../utils/request.js');

/** 
 * visitor模块相关api
 * **/

// 根据条件拉取visitors列表  完成  不要了
export function getMyVisitorList(query){
    return request.get("/api/v1/myvisitors/", query);
}
