// pages/post/event-button.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
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
            title: ['订阅楼盘动态提醒', '已订阅!'],
            desc: ['一键订阅楼盘动态，开盘、变价、优惠活动等楼盘信息将会通过短信通知您，让您抢占买房先机', '已订阅，楼盘动态将会通过短信通知您'],
            btn: ['订阅提醒', '已订阅']
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
            wx.showLoading({
                title: '处理中',
                mask: true,
            });
            var _this = this
            auth.ensureUser((user) => {
                wx.hideLoading();
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
            var data = { post_id: this.data.pid }
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
                    // 取消后
                    if (method === 'DELETE') {
                        wx.showToast({
                            title: '已取消订阅楼盘动态通知',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: true,
                        });

                    }

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
