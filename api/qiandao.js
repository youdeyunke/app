let request = require('../utils/request.js');

/** 
 * 每日签到模块接口
 * **/

//签到，无需参数    完成
export function qiandao( ){
    return request.post("/api/v6/qiandao" , {});
}
