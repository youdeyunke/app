let request = require('../utils/request.js');
// 替换完成未检测
export function getPostList(data){
    return request.get("/api/v2/posts/hello", data);
}

// 拉取楼盘详情页模块数据
export function getPostBlocks(postId){
    return request.get("/api/v5/posts/", postId);
}

// 拉取楼盘基本信息
export function getPostBaseInfo(postId){
    return request.get("/api/v1/post_base_info/", postId);
}

