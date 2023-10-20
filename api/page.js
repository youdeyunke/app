let request = require('../utils/request.js');

/** 
 * 自定义页面模块接口
 * **/

// 拉取Page详细信息    完成  
export function getPageDetail(pageIdOrKey, query={}){
    return request.get("/api/v6/pages/" +pageIdOrKey, query );
}



