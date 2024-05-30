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
import { login, logout, getInfo } from '@/api/adminuser'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'


const state = {
    token: getToken(),
    profile: null,
    menus: [],
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },

    SET_USER: (state, profile) => {
        // 设置user 的字段
        state.profile = profile

    },

    SET_MENUS: (state, menus) => {
        // 设置用户菜单（侧边栏）
        state.menus = menus
    }

}

const actions = {
    // user login
    login ({ commit }, loginForm) {
        const { email, password, role, mobile, code, admin_auth_code, account_type, captcha_value, captcha_uuid } = loginForm
        return new Promise((resolve, reject) => {
            login({
                email: email.trim(),
                account_type: account_type,
                password: password,
                role: role,
                mobile: mobile.trim(),
                code: code,
                admin_auth_code: admin_auth_code,
                captcha_value: captcha_value,
                captcha_uuid: captcha_uuid,
            }).then(response => {
                const { status, data } = response
                if (status == 0) {
                    commit('SET_TOKEN', data)
                    setToken(data)
                    // 登录成功
                    Message.success('登录成功')

                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo ({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                // 在解构之前检查 response 是否存在
                if (!response || typeof response !== 'object') {
                    reject('获取用户信息失败！');
                    return;
                }
                const { data } = response;
                // 检查 data 是否存在，以及是否等于 'Token错误'
                if (!data || data === 'Token错误') {
                    reject('请重新登录！');
                    return;
                }

                // 判断是否是管理员

                commit('SET_USER', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout ({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_USER', { id: 0, })
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken ({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_USER', { id: 0, })
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

