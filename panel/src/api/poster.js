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

export function getPosterTemplates (params) {
    return request({
        url: '/admin6/poster_templates',
        method: 'get',
        params
    })
}

export function updateOrder (tplIds) {
    return request({
        url: '/admin6/poster_templates/update_order',
        method: 'POST',
        data: { ids: tplIds }
    })
}

export function createPosterTemplate (data) {
    return request({
        url: '/admin6/poster_templates/',
        method: 'POST',
        data: data
    })
}

export function updatePosterTemplate (data) {
    return request({
        url: '/admin6/poster_templates/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function deletePosterTemplate (pid) {
    return request({
        url: '/admin6/poster_templates/' + pid,
        method: 'DELETE',
    })
}
