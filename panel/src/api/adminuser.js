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


export function login (data) {
    return request({
        url: '/admin6/sessions',
        method: 'POST',
        data: data
    })
}

export function getInfo (token) {
    return request({
        url: '/admin6/admin_users/mine',
        method: 'get'
    })
}

export function getAdminUserList () {
    return request({
        url: '/admin6/admin_users/',
        method: 'get'
    })
}


export function getAdminUsers () {
    return request({
        url: '/admin6/admin_users/',
        method: 'get'
    })
}

export function deleteAdminUser (aid) {
    return request({
        url: '/admin6/admin_users/' + aid,
        method: 'delete'
    })
}

export function createAdminUser (adminUser) {
    return request({
        url: '/admin6/admin_users/',
        data: adminUser,
        method: 'post'
    })
}
export function updateAdminUser (adminUser) {
    return request({
        url: '/admin6/admin_users/' + adminUser.id,
        data: adminUser,
        method: 'patch'
    })
}


export function logout () {
    return request({
        url: '/admin6/sessions/myself',
        method: 'delete'
    })
}

export function changePassword (data) {
    return request({
        url: '/admin6/admin_password',
        method: 'POST',
        data: data
    })
}
