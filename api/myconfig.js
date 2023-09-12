let request = require('../utils/request.js');

// 拉取基本配置  1
export function  getMyconfigDetail(){
    return request.get("/api/v6/myconfigs");
}