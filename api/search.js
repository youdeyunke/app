let request = require('../utils/request.js');


// 查询热门搜索列表  1
export function  getHotSearchList(query){
    return request.get("/api/v1/hot_search", query);
}

// 当用户搜索某个楼盘的时候，标记热门搜索   1
export function  createHoutSearch(postId){
    return request.post("/api/v1/hot_search", {post_id: postId});
}