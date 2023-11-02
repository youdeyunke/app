/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

/** 
 * 评论模块相关api
 * 不需要了，不用写
 * **/


// 给某一条评论点赞   完成
export function likeComment (commentId) {
    return request.post("/api/v1/mycomments/like", { id: commentId });
}


// 删除一条评论  完成
export function deleteComment (commentId) {
    return request.destroy("/api/v1/mycomments/" + commentId);
}


// 拉取评论详情  完成
export function getCommentDetail (commentId) {
    return request.get("/api/v1/mycomments/" + commentId);
}

// 根据条件拉取全部评论列表  完成
export function getAllCommentList (query) {
    return request.get("/api/v1/mycomments/", query);
}

// 根据条件拉取我发布的评论列表 完成
export function getMineCommentList (query) {
    return request.get("/api/v1/mycomments/mine", query);
}

// 发布一条评论   完成
export function createComment (data) {
    return request.post("/api/v1/mycomments/", data);
}