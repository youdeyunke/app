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
import request from '@/utils/request'

export function getQuestionsList (params) {
    return request({
        url: '/admin6/questions',
        method: 'GET',
        params
    })
}

export function deleteQuestion (qid) {
    return request({
        url: '/admin6/questions/' + qid,
        method: 'DELETE',
    })
}

export function getQuestionDetail (qid) {
    // 问答详情 + 回复列表
    return request({
        url: '/admin6/questions/' + qid,
        method: 'GET',
    })
}


export function deleteAnswer (qid) {
    return request({
        url: '/admin6/answers/' + qid,
        method: 'DELETE',
    })
}

export function createAnswer (answer) {
    /*
        answer : {user_id:11, content: 'xxx',   question_id: 11}
    */
    return request({
        url: '/admin6/answers/',
        method: 'POST',
        data: answer
    })
}

export function publicQuestion (qid) {
    return request({
        url: '/admin6/auditing_question/' + qid,
        method: 'PATCH',
    })
}

export function publicAnswer (Aid) {
    return request({
        url: '/admin6/auditing_answer/' + Aid,
        method: 'PATCH',
    })
}

