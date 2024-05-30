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

export function getModuleConfigs (params) {
    return request({
        url: '/admin6/module_configs',
        method: 'GET',
        params,
    })
}

export function updateModuleConfig (data) {
    return request({
        url: '/admin6/module_configs/' + data.id,
        method: 'PATCH',
        data: data,
    })
}