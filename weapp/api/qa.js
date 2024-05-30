/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

/**
 * 问答相关
 */

// 删除一个答案  
export function deleteAnswer (aid) {
    return request.destroy("/api/v6/answers/" + aid);
}

// 点赞一个答案    
export function likeAnswer (aid) {
    return request.put("/api/v6/answers/" + aid, { do: 'like' });
}


// 发布一个答案    
export function createAnswer (questionId, content) {
    return request.post("/api/v6/answers/", {
        question_id: questionId,
        content: content
    });
}


// 拉取问题列表  
export function getAnswerList (data) {
    return request.get("/api/v6/questions/", data);
}

// 发布一个提问     
export function createQuestion (data) {
    return request.post("/api/v6/questions/", data);
}

// 删除提问   
export function deleteQuestion (qid) {
    return request.destroy("/api/v6/questions/" + qid);
}

export function getQuestionList (qaId) {
    return request.get("/api/v6/questions/" + qaId);
}

// 关注一个问题   
export function followQuestion (qid) {
    var data = { question_id: qid }
    return request.post("/api/v6/question_followers/" + qid);
}
// 取消关注   
export function cancleFollowQuestion (qid) {
    var data = { question_id: qid }
    return request.destroy("/api/v6/question_followers/" + qid);
}






