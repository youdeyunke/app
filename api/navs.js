let request = require('../utils/request.js');

/** 
 * navs模块接口
 * **/

// 根据位置拉取拉取nav详细信息  完成 
export function getNavFromPosition(positionId){
    return request.get("/api/v6/navs/", {position_id: positionId} );
}

