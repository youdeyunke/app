/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgTour/pages/tour-coupon/show.js
const app = getApp()
const tourApi = require("../../../api/tour")
const historyApi = require("../../../api/history")
const smsApi = require('../../../api/sms')
var auth = require('../../../utils/auth');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tourId: null,
        homebtn: null,
        joined: false,
        showForm: false,
        brokerName: "",
        brokerPhone: "",
        password: '',
        user: null,
        name: '',
        numbers: 1,
        remark: '领取',

        html: '',
        item: null,
        mobile_lock: false,
        sms_code: '',
        mobile: null
    },

    moveHome () {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    createHaibao () {
        var tour = this.data.item
        this.selectComponent("#poster").showPopup(tour)
    },

    gotoKaquan () {
        wx.navigateTo({
            url: '/pkgMyself/pages/coupons/index',
        })
    },

    mobileChange () {
        this.setData({
            mobile_lock: false
        })
    },

    smsLoginHandle (cb) {
        // 通过短信验证码登陆账号
        var phone = this.data.mobile
        var code = this.data.sms_code
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            wx.showModal({
                title: '手机号格式错误',
                icon: 'none'
            })
            this.setData({
                loading: false,
            })
            return false
        }
        if (code.length != 4) {
            wx.showModal({
                title: '验证码输入错误',
                icon: 'none'
            })
            this.setData({
                loading: false,
            })
            return false
        }
        smsApi.smsAuth(phone, code).then((res) => {
            var data = res.data
            if (data.status == 0) {
                // 保存下服务器返回的token
                var token = data.data.token
                var user = data.data.user
                auth.setUserInfo(token, user)
                return cb()
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        app.checkForceLogin()
        this.setData({
            tourId: q.id,
            brokerId: q.broker_id || '',
        }, () => {
            this.loadData()
            this.createHistory(q.id)
        })
    },

    createHistory (id) {
        historyApi.createHistory({
            target_type: "tour",
            target_id: id
        }).then((resp) => {
            if (resp.data.data.status != 0) {
                return
            }
        })
    },

    joinHandle: function () {
        // 如果是需要输入口令领取
        // if (this.data.item.password_enable) {
        this.setData({
            showForm: true,
        })
        return
        // }
        // this.submitHandle()
    },

    formClose: function () {
        this.setData({
            showForm: false,
            password: '',

        })
    },


    submitHandle: function () {
        if (this.data.loading) {
            return
        }
        // 检查口令
        if (this.data.item.password_enable) {
            if (this.data.password.length < 2) {
                wx.showToast({
                    icon: 'none',
                    title: '请输入正确的口令',
                })
                return false
            }
        }

        // 提交报名
        var data = {
            password: this.data.password,
            tour_id: this.data.tourId,
            name: this.data.name,
            broker_name: this.data.brokerName,
            broker_phone: this.data.brokerPhone,
            mobile: this.data.mobile,
            numbers: 1,
            remark: '点击领取卡券',
        }
        if (!data.name) {
            wx.showToast({
                icon: 'none',
                title: '请填写联系人',
            })
            return false
        }
        if (!data.mobile) {
            wx.showToast({
                icon: 'none',
                title: '请填写手机号',
            })
            return false
        }
        var _this = this
        this.setData({
            loading: true,
            showForm: false,
        })

        _this.formClose()
        if (this.data.mobile_lock) {
            _this.postData(data)
        } else {
            _this.smsLoginHandle(() => {
                _this.postData(data)
            })
        }
    },

    postData (data) {
        var _this = this
        tourApi.createTourCoupon(data).then((resp) => {
            _this.setData({
                loading: false
            })
            if (resp.data.status == 0) {
                wx.showModal({
                    title: '领取成功',
                    content: '卡券已发送到您的账号中，进入：我的-我的卡券查看',
                    showCancel: false,
                    confirmText: '去查看',
                    confirmColor: '#B20700',
                    success: (result) => {
                        if (result.confirm) {
                            var url = '/pkgMyself/pages/coupons/index'
                            wx.redirectTo({
                                url: url,
                            })
                        }
                    },
                    fail: () => { },
                    complete: () => { }
                });

            }
        })
    },

    loadData: function (cb) {
        var _this = this
        var bid = this.data.brokerId || ''
        tourApi.getTourDetail(_this.data.tourId, { broker_id: bid }).then((resp) => {
            var tour = resp.data.data
            var joined = resp.data.data.joined
            var html = tour.content || ''
            var post = resp.data.data.post
            console.log('tour', tour, 'join', joined)
            if (html) {
                html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
                html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
            }

            var b = resp.data.broker || {}
            _this.setData({
                item: tour,
                brokerName: b.name || '',
                brokerPhone: b.phone || '',
                html: html,
                loading: false,
                post: post,
                joined: joined
            })
            wx.setNavigationBarTitle({
                title: tour.title + ' ' + tour.status_name,
            });

            return typeof cb == 'function' && cb(resp.data.data)
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    callHandle: function () {
        var m = this.data.item.server_mobile
        wx.makePhoneCall({
            phoneNumber: m,
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        setTimeout(function () {
            wx.hideLoading()
        }, 500)
        var u = app.globalData.userInfo
        if (u && u.mobile) {
            this.setData({
                mobile: u.mobile,
                user: u,
                mobile_lock: true
            })
        }

        this.setData({
            loading: false,
        })
        var _this = this
        app.ensureConfigs(function (configs) {
            var ui = configs.ui
            var color = configs.color
            _this.setData({
                headerImg: ui.login_header,
                bodyImg: ui.login_body,
                primaryBtnColor: color.primary_btn,
                primaryColor: color.primary,
            })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },


    onShareTimeline () {
        var _this = this
        var u = app.globalData.userInfo
        var shareQuery = 'id=' + this.data.tourId
        if (u && u.is_broker) {
            // 如果当前账号已经是置业顾问了
            // 那么转发分享的时候，是带上我的标记
            shareQuery += '&broker_id=' + u.id
        } else {
            // 如果当前账号是客户
            // 那么转发额时候，复制上一个置业顾问的标记
            shareQuery += '&broker_id=' + this.data.brokerId || ''
        }

        var title = this.data.item.title
        var image = this.data.item.cover

        return {
            title: title,
            query: shareQuery,
            imageUrl: image
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var u = app.globalData.userInfo
        var sharePath = '/pkgTour/pages/tour-coupon/show?id=' + this.data.tourId
        if (u && u.is_broker) {
            // 如果当前账号已经是置业顾问了
            // 那么转发分享的时候，是带上我的标记
            sharePath += '&broker_id=' + u.id
        } else {
            // 如果当前账号是客户
            // 那么转发额时候，复制上一个置业顾问的标记
            sharePath += '&broker_id=' + this.data.brokerId || ''
        }

        return {
            title: this.data.item.title,
            imageUrl: this.data.item.cover + "?imageView2/1/w/500/h/400",
            path: sharePath,
        }
    }
})