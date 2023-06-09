let request = require('../utils/request.js');

/** 
 * 评论模块相关api
 * **/


// 给某一条评论点赞
export function likeComment (commentId){
    return request.post("/api/v1/mycomments/like", {id: commentId});
}


// 删除一条评论
export function deleteComment (commentId){
    return request.destroy("/api/v1/mycomments/" + commentId);
}


// 拉取评论详情
export function getCommentDetail (commentId){
    return request.get("/api/v1/mycomments/" + commentId);
}

// 根据条件拉取某个楼盘下的评论列表
export function getTargetCommentList (targetId, targetType, scope){
    return request.get("/api/v1/mycomments/", {target_id: targetId, target_type: targetType, scope: scope});
}

// 根据条件拉取全部评论列表
export function getAllCommentList(query){
    return request.get("/api/v1/mycomments/", query);
}

// 根据条件拉取我发布的评论列表
export function getMineCommentList(query){
    return request.get("/api/v1/mycomments/mine", query);
}

// 发布一条评论
export function getAllCommentList(data){
    return request.post("/api/v1/mycomments/", data);
}