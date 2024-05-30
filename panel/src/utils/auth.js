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
import Cookies from 'js-cookie'

const TokenKey = 'token'
const PortKey = 'project_port'

export function getToken () {
    return Cookies.get(TokenKey)
}

export function setToken (token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken () {
    return Cookies.remove(TokenKey)
}


export function getPort () {
    return Cookies.get(PortKey)
}

export function setPort (port) {
    return Cookies.set(PortKey, port)
}

export function removePort () {
    return Cookies.remove(PortKey)
}
