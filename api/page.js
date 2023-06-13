let request = require('../utils/request.js');

/** 
 * 自定义页面模块接口
 * **/

// 拉取Page详细信息
export function getPageDetail(pageIdOrKey, query={}){
    return request.get("/api/v1/pages/" +pageIdOrKey, query );
}

// 缺
// app.request({
//     url: '/api/v1/pages/' + v,
//     hideLoading: true,
//     data: q,
//     success: function (resp) {


