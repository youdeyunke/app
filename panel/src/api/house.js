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

export function getWeappHouseList (params) {
    return request({
        url: '/v6/houses',
        method: 'get',
        params
    })
}

export function getHouseList (params) {
    return request({
        url: '/admin6/houses/',
        method: 'get',
        params
    })
}

export function getHouseDetail (hid) {
    return request({
        url: '/admin6/houses/' + hid,
        method: 'get'
    })
}

export function updateHouse (data) {
    return request({
        url: '/admin6/houses/' + data.id,
        method: 'PATCH',
        data: data,
    })
}

// 用于更新vr 简介 视频 相册
export function updateHouseDetail (data) {
    return request({
        url: '/admin6/houses/info/' + data.id,
        method: 'PATCH',
        data: data,
    })
}

export function _updateState (pid, publisStatus) {
    return request({
        url: '/admin6/houses/state',
        method: 'PATCH',
        data: { publish_status: publisStatus, id: pid }
    })
}

export function deleteHouse (houseId) {
    return request({
        url: '/admin6/houses/' + houseId,
        method: 'DELETE',
    })
}

export function publicHouse (id, res) {
    var state = 'public'
    if (res == false) {
        state = 'unpublic'
    }
    return _updateState(id, state)
}


export function createHouse (data) {
    return request({
        url: '/admin6/houses/',
        method: 'POST',
        data:  data 
    })
}

// 二手房生成二维码
export function refreshHouseQrcode (hid) {
    return request({
        url: '/admin6/houses/refresh_qrcode/' + hid,
        method: 'POST',
    })

}