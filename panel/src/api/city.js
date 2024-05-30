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

export function getCityList (params) {
    var params = {}
    return request({
        url: '/admin6/city/',
        method: 'get',
        params
    })
}


export function getCity (cid) {
    var params = {}
    return request({
        url: '/admin6/city/' + cid,
        method: 'get',
        params
    })
}

export function updateCity (data) {
    return request({
        url: '/admin6/city/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function setDefaultCity (cityId) {
    // 将指定城市设置位默认城市
    return request({
        url: '/admin6/city/set_default',
        method: 'PATCH',
        data: { id: cityId }
    })
}

export function createCity (data) {
    return request({
        url: '/admin6/city/',
        method: 'POST',
        data: data
    })
}

export function deleteCity (id) {
    return request({
        url: '/admin6/city/' + id,
        method: 'DELETE',
    })
}