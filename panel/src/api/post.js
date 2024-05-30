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


export function getWeappPostList (params) {
    return request({
        url: '/v6/posts',
        method: 'get',
        params
    })
}


export function getPostList (params) {
    return request({
        url: '/admin6/posts',
        method: 'get',
        params
    })
}

export function getPostSimpleList (params) {
    return request({
        url: '/admin6/posts/simplelist',
        method: 'get',
        params
    })
}

export function getPostDetail (pid) {
    return request({
        url: '/admin6/posts/' + pid,
        method: 'get'
    })
}


export function updatePost (data) {
    return request({
        url: '/admin6/posts/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function _updateState (pid, state) {
    return request({
        url: '/admin6/posts/state',
        method: 'PATCH',
        data: { state: state, id: pid }
    })
}

export function deletePost (pid) {
    return request({
        url: '/admin6/posts/isDelete',
        method: 'PATCH',
        data: { state: 'delete', id: pid }
    })
}

export function publicPost (pid, res) {
    var state = 'public'
    if (res == false) {
        state = 'unpublic'
    }
    return request({
        url: '/admin6/posts/isPublic',
        method: 'PATCH',
        data: { state: state, id: pid }
    })
}

export function markHotPost (pid, res) {
    var state = 'is_top'
    if (res == false) {
        state = 'not_top'
    }
    return request({
        url: '/admin6/posts/isTop',
        method: 'PATCH',
        data: { state: state, id: pid }
    })
}

export function createPost (data) {
    return request({
        url: '/admin6/posts/',
        method: 'POST',
        data: data
    })
}


export function getCatList (params) {
    return request({
        url: '/v6/cats/',
        method: 'get',
        params
    })
}

export function getFitmentList (params) {
    return request({
        url: '/v6/fitments/',
        method: 'get',
        params
    })
}

export function getTypeList (pid) {
    var params = { post_id: pid }
    return request({
        url: '/admin6/types/',
        method: 'get',
        params
    })
}

export function updateType (data) {
    return request({
        url: '/admin6/types/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function updateTypesOrder (orderIds) {
    return request({
        url: '/admin6/types/update_order',
        method: 'POST',
        data: { ids: orderIds }
    })
}

export function createType (data) {
    return request({
        url: '/admin6/types/',
        method: 'POST',
        data: data
    })
}

export function deleteType (pid) {
    return request({
        url: '/admin6/types/' + pid,
        method: 'DELETE'
    })
}





// 查询全部分类
export function getAlbumList () {
    return request({
        url: '/admin6/albums/',
        method: 'get'
    })
}

// 创建分类
export function createAlbum (album) {
    return request({
        url: '/admin6/albums/',
        data: album,
        method: 'POST',
    })

}

// 修改分类信息
export function updateAlbum (album) {
    return request({
        url: '/admin6/albums/' + album.id,
        data: album,
        method: 'PATCH',
    })
}

// 修改分类房源
export function updateAlbumPosts (albumId, postIds) {
    return request({
        url: '/admin6/album_posts/' + albumId,
        data: { post_ids: postIds },
        method: 'PATCH',
    })
}

// 删除分类信
export function deleteAlbum (albumId) {
    return request({
        url: '/admin6/albums/' + albumId,
        method: 'DELETE',
    })
}

// 楼盘生成二维码
export function refreshPostQrcode (pid) {
    return request({
        url: '/admin6/posts/refresh_qrcode/' + pid,
        method: 'POST',
    })

}