let request = require('../utils/request.js');

/** 
 * 我的模块接口
 * **/

// 拉取我的页面按钮, 无需参数  完成
export function getMyselfIcons( query = {}){
    return request.get("/api/v1/myself/icons" , query);
}

// 拉取我发布的问题列表  完成
export function getMyselfQuestionList(query){
    return request.get("/api/v6/myself/questions" , query);
}

