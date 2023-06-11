let request = require('../utils/request.js');

/** 
 * 首页开屏广告接口
 * **/

// 拉取开屏广告列表   未找到
export function getFirstScreen(){
    return request.get("/api/v1/first_screen_adds/" );
}

// 更新广告数据    完成
export function updateFirstScreenAdd(data){
    return request.put("/api/v1/first_screen_adds/" + data.id, data );
}

