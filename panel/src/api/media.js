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

// 文档见 http://rap2.taobao.org/repository/editor?id=254219&mod=380484
// 查询媒体文件列表
export function getMediaFiles (params) {
    return request({
        url: '/admin6/media_files',
        method: 'get',
        params
    })
}

// 新建媒体文件/文件夹
export function createMediaFile (data) {
    return request({
        url: '/admin6/media_files',
        method: 'post',
        data: data
    })
}

// 修改媒体文件/文件夹
export function updateMediaFile (id, params) {
    return request({
        url: `/admin6/media_files/${id}`,
        method: 'patch',
        data: params
    })
}

// 删除媒体文件/文件夹
export function deleteMediaFile (id) {
    return request({
        url: `/admin6/media_files/${id}`,
        method: 'delete'
    })
}
