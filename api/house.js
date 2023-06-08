let request = require('../utils/request.js');
// 替换完成
export function getHouseList(data){
    return request.get("/api/v1/houses", data);
}

// 拉取楼盘详情页模块数据  替换完成
export function getHouseBlocks(pid){
    return request.get("/api/v1/houses/"+pid);
}


