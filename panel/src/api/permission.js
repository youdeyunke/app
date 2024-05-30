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

export function getPermissionTree (params) {
    return request({
        url: '/admin6/permission_items/tree',
        method: 'get',
        params
    })
}


export function getPermissionItems (params) {
    return request({
        url: '/admin6/permission_items',
        method: 'get',
        params
    })
}


export function createPermissionItem (item) {
    return request({
        url: '/admin6/permission_items',
        method: 'POST',
        data: item
    })
}

export function updatePermissionItem (item) {
    return request({
        url: '/admin6/permission_items/' + item.id,
        method: 'PATCH',
        data: item
    })
}

export function deletePermissionItem (itemId) {
    return request({
        url: '/admin6/permission_items/' + itemId,
        method: 'DELETE',
    })
}


export function getRoleList (params) {
    return request({
        url: '/admin6/roles',
        method: 'get',
        params
    })
}


export function createRole (item) {
    return request({
        url: '/admin6/roles',
        method: 'POST',
        data: item
    })
}

export function updateRole (item) {
    return request({
        url: '/admin6/roles/' + item.id,
        method: 'PATCH',
        data: item
    })
}

export function deleteRole (itemId) {
    return request({
        url: '/admin6/roles/' + itemId,
        method: 'DELETE',
    })
}
