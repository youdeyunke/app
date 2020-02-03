// pages/post/sub-button.js
const app = getApp()
var auth = require('../../utils/auth.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cat: { type: String },
        pid: { type: Number },
    },


    ready: function () {
        this.loadStatus()
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        showDialog: false,
        title: '',
        btnIcon: {
            open: {
                name: 'clock-o'
            },
            price: { name: 'chart-trending-o' },
        },
        nameDict: {
            open: {
                title: ['订阅开盘提醒', '已订阅开盘提醒'],
                desc: ['一键订阅，开盘消息会通过短信通知您，让您抢占买房先机','已订阅开盘提醒，开盘消息会通过短信通知您'],
                btn: ['开盘提醒我', '取消开盘提醒']
            },
            price: {
                title: ['订阅变价提醒', '已订阅变价提醒'],
                desc: ['一键订阅，变价消息会通过短信通知您，让您抢占买房先机','已订阅变价提醒，变价消息会通过短信通知您'],
                btn: ['变价提醒我', '取消变价提醒'],
            }
        },
        fid: null,
        status: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        confirmHandle: function (e) {
            this.setData({
                confirm: !this.data.confirm
            })
        },
        setTitle: function () {
            // status变化出发title的变化
        },

        closeHandle: function () {
            this.setData({ showDialog: false })
        },

        openHandle: function () {
            var _this = this
            auth.ensureUser((user) => {
                if (_this.data.status == 0) {
                    _this.setData({ showDialog: true })
                    return false
                }
                _this.subHandle()

            })
        },

        subHandle: function () {
            var _this = this
            var method = 'POST'
            var url = '/api/v1/event_followers'
            var data = { post_id: this.data.pid, cat: this.data.cat }
            if (this.data.status == 1) {
                // 取消订阅
                method = 'DELETE'
                url = url + '/' + this.data.fid
            }
            app.request({
                url: url,
                method: method,
                data: data,
                success: function (resp) {
                    // 提交后刷新状态
                    _this.loadStatus()
                }
            })
        },

        loadStatus: function () {
            // 查询订阅状态
            if (!app.globalData.token) {
                return false
            }
            var _this = this
            app.request({
                url: '/api/v1/event_followers',
                hideLoading: true,
                data: {
                    post_id: _this.data.pid,
                    cat: _this.data.cat,
                },
                success: function (resp) {
                    _this.setTitle()
                    if (resp.data.data) {
                        _this.setData({
                            status: 1,
                            fid: resp.data.data.id,
                        })
                        return
                    }
                    _this.setData({
                        status: 0,
                        fid: null,
                    })
                    return
                }
            })
        },

    }
})
