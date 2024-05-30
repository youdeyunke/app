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

export function getMyconfig(params) {
    return request({
        url: '/admin6/myconfigs',
        method: 'get',
        params
    })
}

export function getAppConfig(params) {
    return request({
        url: '/v6/myconfigs',
        method: 'get',
        params
    })
}

//新
export function updateWeappInfo(data) {
    return request({
        url: '/admin6/myconfigs/contact_info',
        method: 'PATCH',
        data: data
    })
}

export function updateMapInfo(data) {
  return request({
    url: '/admin6/myconfigs/map',
    method: 'PATCH',
    data: data
  })
}

export function updateServerInfo(data) {
  return request({
    url: '/admin6/myconfigs/server_info',
    method: 'PATCH',
    data: data
  })
}

export function updateWeappConfig(data) {
  return request({
    url: '/admin6/weapp/config',
    method: 'PATCH',
    data: data
  })
}

export function updateApiKey(data) {
  return request({
    url: '/admin6/reset_api_key',
    method: 'PATCH',
  })
}




