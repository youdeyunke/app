let request = require('../utils/request.js');
// 替换完成
export function getPostList(data){
    return request.get("/api/v2/posts/hello", data);
}

// 拉取楼盘详情页模块数据  替换完成
export function getPostBlocks(pid){
    return request.get("/api/v5/posts/"+pid);
}

// 拉取楼盘基本信息  替换完成
export function getPostBaseInfo(pid){
    return request.get("/api/v1/post_base_info/"+pid);
}

