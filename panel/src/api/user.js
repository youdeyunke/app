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

export function simpleSearch (kw, scope) {
    var params = { kw: kw, scope: 'all' }
    return request({
        url: '/admin6/users/simple_search',
        method: 'get',
        params
    })
}

export function getSimpleUserList (params) {
    return request({
        url: '/admin6/users/simple_search',
        method: 'get',
        params
    })
}

export function downloadUserList (data) {
    // var params = { export: true }
    return request({
        url: '/admin6/user_profile/export',
        method: 'post',
        responseType: 'blob',
        data: data
        // params
    })
}

export function updateWeappUserRemark (data) {
    return request({
        url: '/admin6/users/remark/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function getUserDetail (uid) {
    return request({
        url: '/admin6/users/' + uid,
        method: 'get'
    })
}


export function getBrokerProfileList (params) {
    return request({
        url: '/admin6/broker_profile/',
        method: 'GET',
        params
    })
}

export function getUserProfileList (params) {
    return request({
        url: '/admin6/user_profile/',
        method: 'GET',
        params
    })
}

export function banUser (id) {
    return request({
        url: '/admin6/user_profile/ban/' + id,
        method: 'PATCH',
    })
}

export function getBrokerProfile (userId) {
    return request({
        url: '/admin6/broker_profile/' + userId,
        method: 'GET',
    })
}

export function deleteBrokerProfile (bid) {
    return request({
        url: '/admin6/broker_profile/' + bid,
        method: 'DELETE',
    })
}

export function updateBrokerProfile (data) {
    return request({
        url: '/admin6/broker_profile/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function createBrokerProfile (data) {
    return request({
        url: '/admin6/broker_profile/',
        method: 'POST',
        data: data
    })
}

export function checkBrokerMobile (mobile) {
    return request({
        url: '/admin6/sessions/check_mobile',
        method: 'POST',
        data: { mobile: mobile }
    })
}
