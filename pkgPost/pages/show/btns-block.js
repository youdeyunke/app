// components/broker.js const app = getApp()
const app = getApp()
const listApi = require("../../../api/post")
var auth = require('../../../utils/auth.js');

Component({
    options: {},
    /**
     * 组件的属性列表
     */

    properties: {
        value: {
            type: Object,
            value: null
        },
    },

    observers: {
        "value.fav_count": function (val) {
            this.setData({
                favCount: val
            })
        },
        "value.fav_status": function (val) {
            this.setData({
                favStatus: val
            })
        },
        "value.booking_status": function (val) {
            this.setData({
                bookingStatus: val
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        chatEnable: true,
        bookingStatus: 0,
        favStatus: 0,
        favCount: 0,
    },

    ready: function () {
        var _this = this
        var ext = wx.getExtConfigSync()
        this.setData({
            chatEnable: ext['chat_enable'] != false
        })
    },


    /**
     * 组件的方法列表
     */
    methods: {

        posterHandle: function () {
            var pid = this.data.value.post_id
            wx.navigateTo({
                url: '/pkgPoster/pages/poster/index?id=' + pid
            })
        },

        reportHandle: function () {
            var pid = this.data.value.post_id
            wx.navigateTo({
                url: '/pages/fenxiao/report?pid=' + pid
            })
        },

        loadFavStatus: function () {
            // 查询收藏状态
            var _this = this
            app.request({
                url: '/api/1/favs/',
                hideLoading: true,
                data: {
                    target_id: _this.data.value.post_id,
                    target_type: 'post'
                },
                success: function (resp) {
                    _this.setData({
                        favStatus: resp.data.data.status,
                        favCount: resp.data.data.count,
                    })
                },
            })
        },

        favHandle: function (e) {
            var pid = this.data.value.post_id
            var _this = this
            auth.ensureUser(function (userInfo) {
                app.request({
                    url: '/api/1/favs/',
                    hideLoading: false,
                    method: 'POST',
                    data: {
                        target_id: pid,
                        target_type: 'post'
                    },
                    success: function (resp) {
                        _this.setData({
                            favStatus: resp.data.data.status,
                            favCount: resp.data.data.count,
                        })
                    }
                })
            })
        },

        reportHandle: function () {
            var pid = this.data.value.post_id
            wx.navigateTo({
                url: '/pages/fenxiao/report?pid=' + pid,
            })
        },

        callHandle: function () {
            var m = this.data.value.mobile
            wx.makePhoneCall({
                phoneNumber: m,
            })
        },

        chatHandle: function () {
            var _this = this
            auth.ensureUser(function (user) {
                // 不能和自己聊天
                if (user.id == _this.data.value.broker_id) {
                    wx.showToast({
                        icon: 'none',
                        title: '不能和自己聊天'
                    })
                    return false
                }
                return _this._chatHandle()
            })
        },

        _chatHandle: function () {
            // 先调用打招呼接口
            wx.showLoading({
                title: '正在打开',
                icon: 'none',
                mask: true
            })
            var pid = this.data.value.post_id
            var brokerId = this.data.value.broker_id
            var _this = this
            // 有待检验
            listApi.getPostList({
                id: pid,
                receiver_id: brokerId
            }).then((res) => {
                console.log("res", res);
                if (resp.data.status == 0) {
                    // 跳转到消息列表
                    wx.navigateTo({
                        url: '/pages/messages/show?target_user_id=' + brokerId,
                    })
                }
            })
        },



        bookingHandle: function (e) {
            var _this = this
            auth.ensureUser(function (user) {
                // 经纪人本人不能预约经纪人的房源

                // 去绑定用户手机号
                if (!user.mobile) {
                    app.bindPhoneNumber(e, function (mobile) {
                        _this.selectComponent('#booking').openHandle()
                    })
                } else {
                    _this.selectComponent('#booking').openHandle()
                }
            })
        },

        bookingChange: function (e) {
            this.setData({
                bookingStatus: 1
            })
        },

    }
})