let request = require('../utils/request.js');

/** 
 * 我的模块接口
 * **/

// 拉取我的页面按钮, 无需参数
export function getMyselfIcons( query = {}){
    return request.get("/api/v1/myself/icons" , query);
}

// 拉取我发布的问题列表
export function getMyselfQuestionList( query  ){
    return request.get("/api/v1/myself/questions" , query);
}


// 每日签到,无需参数
export function markSign( ){
    return request.post("/api/v1/qiandao" , {});
}
