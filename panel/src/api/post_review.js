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

export function getPostReviewsList (params) {
    // params: { post_id: xx }  查询某个楼盘下的楼盘评测
    return request({
        url: '/admin6/post_reviews',
        method: 'GET',
        params
    })
}

export function createPostReviews (data) {
    return request({
        url: '/admin6/post_reviews',
        method: 'POST',
        data: data
    })
}

export function updatePostReviews (data) {
    return request({
        url: '/admin6/post_reviews/' + data.id,
        method: 'PATCH',
        data: data
    })
}

export function deletePostReviews (tid) {
    return request({
        url: '/admin6/post_reviews/' + tid,
        method: 'DELETE',
    })
}

export function updatePostReviewsEnable (tid) {
    return request({
        url: '/admin6/posts/reviewEnable/' + tid,
        method: 'PATCH',
    })
}