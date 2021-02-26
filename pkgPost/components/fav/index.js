// components/fav.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pid: { type: Number, value: null },
        showcount: { type: Boolean, value: false },
        showstatus: { type: Boolean, value: false, }
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

    ready: function () {
    },


    /**
     * 组件的方法列表
     */
    methods: {
        loadDefaultStatus: function () {
            // 查询初始状态
            // 查询状态
            var _this = this

            app.request({
                url: '/api/v2/favs/',
                hideLoading: false,
                data: { post_id: _this.data.pid },
                success: function (resp) {
                    _this.setData(resp.data.data)
                },
            })
        },

        clickHandle: function (e) {

            var pid = this.data.pid
            var _this = this
            auth.ensureUser(function (userInfo) {
                _this.doSubmit(pid)
            })
        },

        doSubmit: function (pid) {
            if (!pid) {
                console.error('pid 不存在', pid)
                return
            }
            var _this = this
            app.request({
                url: '/api/v2/favs/',
                hideLoading: false,
                method: 'POST',
                data: { post_id: pid },
                success: function (resp) {
                    _this.setData(resp.data.data) // {{ count:0, status: 1}}
                    if (resp.data.status == 1) {
                        var t = '已收藏'
                    } else {
                        var t = '已取消'
                    }
                    wx.showToast({
                        title: t,
                        icon: 'none',
                        duration: 1500,
                        mask: false,
                    });

                }
            })
        },

    }

})
