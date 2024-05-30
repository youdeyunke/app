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
import { constantRoutes } from '@/router'
import { getMenus } from '@/api/menus'
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
    })

    return res
}

export function loadView (path) {
    // 根据路径import文件
    return (resolve) => require([`@/views/${path}`], resolve)
    //return import('@/views/' + path )
}

export function mapMenuItem (menu) {
    // 对服务端返回的menu数组进行一次包装处理
    if (menu.component == 'Layout') {
        menu.component = Layout
    } else {
        menu.component = loadView(menu.component)
    }
    menu.children = !menu.children ? [] : menu.children
    //menu.props = { btns: { name: 'test' }, }
    menu.children.map((m, i) => {
        return mapMenuItem(m)
    })
    return menu
}


const state = {
    routes: [],
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        // 404 page must be placed at the end !!!
        routes.push({ path: '*', redirect: '/404', hidden: true })
        state.routes = constantRoutes.concat(routes)
    },

}

const actions = {
    getMenus ({ commit, state }) {
        return new Promise((resolve, reject) => {
            getMenus().then((resp) => {
                const { data } = resp
                if (!data) {
                    reject("获取菜单失败")
                }
                data.map((menuItem, i) => {
                    return mapMenuItem(menuItem)
                })
                commit('SET_ROUTES', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
