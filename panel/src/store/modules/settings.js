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
import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo, tagsView } = defaultSettings

const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    tagsView: tagsView,
    sidebarLogo: sidebarLogo
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting ({ commit }, data) {
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

