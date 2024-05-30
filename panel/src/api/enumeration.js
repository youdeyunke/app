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

export function getEnumerationList (params) {
    return request({
        url: '/admin6/enumerations/',
        method: 'get',
        params
    })
}

export function updateEnumeration (data) {
    return request({
        url: '/admin6/enumerations/' + data.id,
        method: 'PATCH',
        data: data,
    })
}

export function createEnumeration (data) {

    return request({
        url: '/admin6/enumerations/',
        method: 'POST',
        data: data,
    })
}

export function deleteEnumeration (eid) {
    return request({
        url: '/admin6/enumerations/' + eid,
        method: 'DELETE',
    })
}