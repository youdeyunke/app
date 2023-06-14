let request = require('../utils/request.js');

// 拉取基本配置
export function  getMyconfigDetail(){
    return request.get("/api/v1/myconfigs/");
}