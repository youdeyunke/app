let request = require('../utils/request.js');

/**
 * 问答相关
 */

// 删除一个答案  1
export function deleteAnswer(aid) {
    return request.destroy("/api/v1/answers/" + aid);
}

// 点赞一个答案    
// 给回答点赞
export function  likeAnswer(aid){
    return request.put("/api/v1/answers/" + aid, { do: 'like' });
}


// 发布一个答案    1
export function createAnswer(questionId, content) {
    return request.post("/api/v1/answers/", {
        question_id: questionId,
        cotent: content
    });
}


// 拉取问题列表   1
export function getAnswerList(qid) {
    return request.get("/api/v1/answers/" + qid);
}
// 查询答案详情
export function getAnswerDetail(answerId) {
    return request.get("/api/v1/answers/" + answerId);
}

// 发布一个提问     未发现
export function createQuestion(data) {
    return request.post("/api/v1/questions/", data);
}

// 关注一个问题   1
export function followQuestion(qid) {
    var data = { question_id: qid }
    return request.post("/api/v1/question_followers/", data);
}

export function  cancleFollowQuestion(qid){
    var data = { question_id: qid }
    return request.destroy("/api/v1/question_followers/" + qid, data);
}






// 删除提问   1
export function  deleteQuestion(qid){
    return request.destroy("/api/v1/questions/" + qid);
}