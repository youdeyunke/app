let request = require('../utils/request.js');

/**
 * 问答相关
 */

// 删除一个答案  1
export function deleteAnswer(aid) {
    return request.destroy("/api/v1/answers/" + aid);
}

// 点赞一个答案    之前是put请求
export function likeAnswer(aid) {
    return request.post("/api/v1/answers/" + aid, {
        do: 'like'
    });
}
// 缺1
// app.request({
//     method: 'PUT',
//     hideLoading: true,
//     url: '/api/v1/answers/' + _this.data.aid,
//     data: { do: 'like' },
//     success: function (resp) {
//         var likes = resp.data.data
//         _this.markLiked()
//         _this.setData({ likesCount: likes })
//     }
// })
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


// 拉取问题列表    格式不对
export function getAnswerList(qid) {
    return request.get("/api/v1/questions/" + qid);
}
// app.request({
//     url: '/api/v1/questions/' + _this.data.id,
//     hideLoading: true,
//     success: function (resp) {


// 发布一个提问     未发现
export function createQuestion(data) {
    return request.post("/api/v1/questions/", data);
}

// 关注或者取消关注一个问题   1
export function followQuestion(qid) {
    var query = {
        question_id: qid
    }
    return request.post("/api/v1/question_followers/" + qid, query);
}





// 缺
// app.request({
//     url: '/api/v1/questions/' + _this.data.item.id,
//     method: 'DELETE',
//     success: function (resp) {
// 删除提问
export function  deleteQuestion(qid){
    return request.destroy("/api/v1/questions/" + qid);
}