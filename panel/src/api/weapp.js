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

export function getBrokerList (params) {
    return request({
        url: '/v6/brokers',
        method: 'get',
        params
    })
}

export function getPathList () {
    return request({
        url: '/admin6/paths',
        method: 'get'
    })
}

export function getNewsList (params) {
    return request({
        url: '/v6/news/',
        method: 'get',
        params: params || {}
    })
}

export function getToursList (params) {
    return request({
        url: '/v6/tours',
        method: 'get',
        params: params || {}
    })
}

export function getMyconfigs (params = {}) {
    return request({
        url: '/v6/myconfigs',
        method: 'GET',
        params: params
    })
}

export function getVideoList (params) {
    return request({
        url: '/v6/videos',
        method: 'GET',
        params: params
    })
}

export function getNewsCatList (params) {
    return request({
        url: '/v6/news_cats/',
        method: 'GET',
        params: params
    })
}


