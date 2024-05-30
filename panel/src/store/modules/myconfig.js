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
import { getMyconfig, updateMyconfig } from '@/api/myconfig'
import Vue from 'vue'

const state = {
    id: null,
}

const mutations = {
    SET_MYCONFIG: (state, myconfig) => {
        Object.keys(myconfig).forEach((k, i) => {
            const val = myconfig[k]
            Vue.set(state, k, val)
        })
    }
}

const actions = {
    updateMyconfig ({ commit, state }, cid, conf) {
        return new Promise((resolve, reject) => {
            updateMyconfig(cid, conf).then(resp => {
                const { data } = resp
                commit('SET_MYCONFIG', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    loadMyconfig ({ commit, state }) {
        console.log('call load myconfig in store')
        return new Promise((resolve, reject) => {
            getMyconfig().then(resp => {
                const { data } = resp
                commit('SET_MYCONFIG', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
