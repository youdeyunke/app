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
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import myconfig from './modules/myconfig'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        permission,
        user,
        myconfig,
        tagsView,
    },
    getters
})

export default store
