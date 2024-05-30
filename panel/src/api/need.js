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

export function getNeedList (params) {
    return request({
        url: '/admin6/needs/',
        method: 'get',
        params
    })
}

export function deleteNeed (nid) {
    return request({
        url: '/admin6/needs/' + nid,
        method: 'DELETE',
    })
}

export function exportNeedData () {
    return request({
        url: '/admin6/needs/export',
        method: 'POST',
        responseType: 'blob'
    })
}

