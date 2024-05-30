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

export function getNewsList (params) {
    return request({
        url: '/admin6/news',
        method: 'get',
        params
    })
}


export function updateNews (data) {
    var url = '/admin6/news/'
    var method = 'POST'

    if (data.id) {
        url = url + data.id
        method = 'PATCH'
    }

    return request({
        url: url,
        method: method,
        data: data,
    })
}

export function deleteNews (nid) {
    return request({
        url: '/admin6/news/' + nid,
        method: 'DELETE',
    })
}

export function deleteNewsCat (cid) {
    return request({
        url: '/admin6/news_cats/' + cid,
        method: 'DELETE',
    })
}


export function getNewsCatList (params) {
    return request({
        url: '/admin6/news_cats',
        method: 'get',
        params
    })
}

export function updateNewsCat (data) {
    var url = '/admin6/news_cats/'
    var method = 'POST'

    if (data.id) {
        url = url + data.id
        method = 'PATCH'
    }

    return request({
        url: url,
        method: method,
        data: data,
    })
}
