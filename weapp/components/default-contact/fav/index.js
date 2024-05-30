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
// components/fav.js
const app = getApp()
const favApi = require("../../../api/fav")
var auth = require('../../../utils/auth.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pid: {
            type: Number,
            value: null
        },
        showcount: {
            type: Boolean,
            value: false
        },
        showstatus: {
            type: Boolean,
            value: false,
        }
    },

    observers: {
        "pid": function (pid) {
            if (!pid) {
                return
            }
            this.loadDefaultStatus()
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        count: 0,
        status: 0,
    },

    ready: function () { },


    /**
     * 组件的方法列表
     */
    methods: {
        loadDefaultStatus: function () {
            // 查询初始状态
            // 查询状态
            var _this = this
            var query = {
                target_id: _this.data.pid,
                target_type: 'post'
            }
            favApi.getFavStatus(query).then((resp) => {
                _this.setData(resp.data.data)
            })
        },

        clickHandle: function (e) {
            // 如果没有登录，则弹窗登录窗口 
            if (!app.globalData.token) {
                this.selectComponent('.loginwindow').openWindow()
                return
            }

            var pid = this.data.pid
            var _this = this

            if (!pid) {
                console.error('pid 不存在', pid)
                return
            }
            var _this = this
            // 先修改状态，再提交api 
            this.setData({
                status: this.data.status == 1 ? 0 : 1
            })
            favApi.createFav('post', pid).then((resp) => {
                _this.setData(resp.data.data) // {{ count:0, status: 1}}
                if (resp.data.data == true) {
                    var t = '已收藏'
                } else {
                    var t = '已取消'
                }
                console.log('fav change ')
                _this.triggerEvent('change', {
                    status: resp.data.data,
                    title: t
                })
                wx.showToast({
                    title: t,
                    icon: 'none',
                    duration: 1500,
                    mask: false,
                });
            })
        },

    }

})