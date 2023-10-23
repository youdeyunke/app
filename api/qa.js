let request = require('../utils/request.js');

/**
 * 问答相关
 */

// 删除一个答案  完成
export function deleteAnswer(aid) {
    return request.destroy("/api/v6/answers/" + aid);
}

// 点赞一个答案    
// 给回答点赞    完成
export function  likeAnswer(aid){
    return request.put("/api/v6/answers/" + aid, { do: 'like' });
}


// 发布一个答案    完成
export function createAnswer(questionId, content) {
    return request.post("/api/v6/answers/", {
        question_id: questionId,
        content: content
    });
}


// 拉取问题列表   未发现
//export function getAnswerList(qid) {
//    return request.get("/api/v1/answers/" + qid);
//}
// 查询答案详情  未发现
//export function getAnswerDetail(answerId) {
//    return request.get("/api/v1/answers/" + answerId);
//}

// 发布一个提问     完成
export function createQuestion(data) {
    return request.post("/api/v6/questions/", data);
}

// 删除提问   完成
export function  deleteQuestion(qid){
    return request.destroy("/api/v6/questions/" + qid);
}

// 1
export function getQuestionList(qaId) {
    return request.get("/api/v6/questions/" + qaId);
}


// 关注一个问题   1
export function followQuestion(qid) {
    var data = { question_id: qid }
    return request.post("/api/v6/question_followers/"+ qid);
}
// 取消关注   1
export function  cancleFollowQuestion(qid){
    var data = { question_id: qid }
    return request.destroy("/api/v6/question_followers/" + qid);
}






