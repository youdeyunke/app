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
import { getMenus } from '@/api/menus'
import Layout from '@/layout'
import { constantRoutes } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
    })

    return res
}

export function loadView(path) {
    // 根据路径import文件
    return (resolve) => require([`@/views/${path}`], resolve)
    //return import('@/views/' + path )
}

export function mapMenuItem(menu) {
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
    getMenus({ commit, state }) {
        return new Promise((resolve, reject) => {
            getMenus().then((resp) => {
                var { data } = resp
                if (!data) {
                    reject("获取菜单失败")
                }

                var advancedArr = {
                    "redirect": "",
                    "path": "/advanced",
                    "component": "Layout",
                    "hidden": false,
                    "children": [
                      {
                        "path": "shop",
                        "component": "advanced/shop/index",
                        "hidden": false,
                        "meta": {
                          "icon": "diamond",
                          "title": "门店入驻"
                        },
                        "name": "shop",
                        "props": {
                          "btns": null,
                        }
                      },

                        {
                            "path": "aichat",
                            "component": "advanced/aichat/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "AI聊天"
                            },
                            "name": "aiimport",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "aiimport",
                            "component": "advanced/aiimport/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "AI导入房源"
                            },
                            "name": "aiimport",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "pagemaker",
                            "component": "advanced/pagemaker/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "界面设计器"
                            },
                            "name": "pagemaker",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "tupai",
                            "component": "advanced/tupai/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "土拍查询"
                            },
                            "name": "tupai",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "scoregood",
                            "component": "advanced/scoregood/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "积分商城"
                            },
                            "name": "scoregood",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "gofangrili",
                            "component": "advanced/gofangrili/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "购房日历"
                            },
                            "name": "gofangrili",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "bulletin",
                            "component": "advanced/bulletin/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "楼盘快报"
                            },
                            "name": "bulletin",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "dealinfo",
                            "component": "advanced/dealinfo/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "成交明细"
                            },
                            "name": "dealinfo",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "housesign",
                            "component": "advanced/housesign/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "网签数据"
                            },
                            "name": "housesign",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "auctionhouse",
                            "component": "advanced/auctionhouse/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "法拍房源"
                            },
                            "name": "auctionhouse",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "website",
                            "component": "advanced/website/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "PC网站"
                            },
                            "name": "website",
                            "props": {
                                "btns": null,
                            }
                        },
                        {
                            "path": "visitor",
                            "component": "advanced/visitor/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "访客足迹"
                            },
                            "name": "visitor",
                            "props": {
                                "btns": null,
                            }
                        },

                        {
                            "path": "crm",
                            "component": "advanced/crm/index",
                            "hidden": false,
                            "meta": {
                                "icon": "diamond",
                                "title": "CRM"
                            },
                            "name": "crm",
                            "props": {
                                "btns": null,
                            }
                        }

                    ],
                    "meta": {
                        "icon": "diamond",
                        "title": "高级功能"
                    }
                }

                data = data.concat(advancedArr)

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
