let request = require('../utils/request.js');

/**
 * 问答相关
*/

// 删除一个答案
export function deleteAnswer(aid){
    return request.destroy("/api/v1/answers/" + aid);
}

// 点赞一个答案
export function likeAnswer(aid){
    return request.post("/api/v1/answers/" + aid, {do: 'like'});
}

// 发布一个答案
export function createAnswer(questionId, content){
    return request.post("/api/v1/answers/" , {question_id});
}

// 拉取问题列表
export function createAnswer(query={}){
    return request.get("/api/v1/questions/" , query);
}

// 发布一个提问
export function createQuestion(data){
    return request.post("/api/v1/questions/" , data);
}

// 关注或者取消关注一个问题
export function followQuestion(qid){
    var query = {question_id: qid}
    return request.post("/api/v1/question_followers/" + qid, query);
}