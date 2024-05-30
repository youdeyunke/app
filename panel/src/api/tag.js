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

export function getTagList (params) {
    return request({
        url: '/admin6/tags',
        method: 'get',
        params
    })
}


export function getTagDetail (tagId) {
    return request({
        url: '/admin6/tags/' + tagId,
        method: 'get'
    })
}

export function updateTag (tagObj) {
    /*  tagObj like: {name: '', color: '', text_color: '', cat: 'old', "priority": 10}  */
    return request({
        url: '/admin6/tags/' + tagObj.id,
        method: 'PATCH',
        data: tagObj
    })
}


export function createTag (tagObj) {
    /*  tagObj like: {name: '', color: '', text_color: '', cat: 'old', "priority": 10}  */
    return request({
        url: '/admin6/tags/',
        method: 'POST',
        data: tagObj
    })
}

export function deleteTag (id) {
    return request({
        url: '/admin6/tags/' + id,
        method: 'DELETE',
    })
}


