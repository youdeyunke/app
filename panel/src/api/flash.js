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

export function getFlashList (params) {
    return request({
        url: '/admin6/first_screen_adds',
        method: 'get',
        params
    })
}


export function updateFlash (data) {
    var url = '/admin6/first_screen_adds/'
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

export function deleteFlash (nid) {
    return request({
        url: '/admin6/first_screen_adds/' + nid,
        method: 'DELETE',
    })
}
