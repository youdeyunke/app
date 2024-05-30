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



// 获取房源的全部相册信息
export function getMediaCatList (params) {
    return request({
        url: '/admin6/media_cats/',
        method: 'get',
        params
    })
}

// 获取相册的全部信息
export function getMediaCatDetail (catId) {
    return request({
        url: '/admin6/media_cats/' + catId,
        method: 'get',
    })
}


// 创建一个新的相册
export function createMediaCat (data) {
    return request({
        url: '/admin6/media_cats/',
        method: 'POST',
        data: data
    })
}

// 修改相册
export function updateMediaCat (data) {
    return request({
        url: '/admin6/media_cats/' + data.id,
        method: 'PATCH',
        data: data
    })
}

// 删除相册
export function deleteMediaCat (cid) {
    return request({
        url: '/admin6/media_cats/' + cid,
        method: 'DELETE',
    })
}


// 向相册中添加照片
export function createMediaItem (item) {
    return request({
        url: '/admin6/media_items/',
        method: 'POST',
        data: item
    })
}
export function updateMediaItem (item) {
    return request({
        url: '/admin6/media_items/' + item.id,
        method: 'PATCH',
        data: item
    })
}

// 删除照片
export function deleteMediaItem (mid) {
    return request({
        url: '/admin6/media_items/' + mid,
        method: 'DELETE',
    })
}


// 更新照片顺序
export function updateMediaItemsOrder (orderItems) {
    return request({
        url: '/admin6/media_items/update_order',
        method: 'POST',
        data: { items: orderItems }
    })
}

// 更新相册顺序
export function updateMediaCatsOrder (orderItems) {
    return request({
        url: '/admin6/media_cats/update_order',
        method: 'POST',
        data: { items: orderItems }
    })
}