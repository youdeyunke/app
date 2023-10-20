let request = require('../utils/request.js');

/** 
 * need模块相关api
 * **/

// 拉取need列表    1   不用了
export function getNeedList(query={}){
    return request.get("/api/v1/needs/", query);
}

export function submitNeed(data) {
  return request.post("/api/v6/needs/", data);
}