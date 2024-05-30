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

export function getEventList (params) {
    return request({
        url: '/admin6/events',
        method: 'GET',
        params
    })
}


export function createEvent (data) {
    return request({
        url: '/admin6/events',
        method: 'POST',
        data: data
    })
}

export function updateEvent (data) {
    return request({
        url: '/admin6/events/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function deleteEvent (eid) {
    return request({
        url: '/admin6/events/' + eid,
        method: 'DELETE',
    })
}
