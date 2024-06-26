/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

/** 
 * 我的模块接口
 * **/


export function getWorkspaceIcons () {
    return request.get("/api/v6/workspace");
}

// 拉取我发布的问题列表  完成
export function getMyselfQuestionList (query) {
    return request.get("/api/v6/myself/questions", query);
}

