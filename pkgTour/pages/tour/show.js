/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pages/news/show.js
const app = getApp()
const smsApi = require('../../../api/sms')
const tourApi = require("../../../api/tour")
const postApi = require("../../../api/post")
var auth = require('../../../utils/auth');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tourId: null,
        homebtn: null,
        showForm: false,
        user: null,
        name: '',
        numbers: '',
        remark: '',
        sms_code: '',
        html: '',
        item: null,
        mobile_lock: false,
        postIds: []
    },

    mobileChange () {
        this.setData({
            mobile_lock: false
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        app.checkForceLogin()
        this.setData({
            tourId: q.id,
        }, () => {
            this.loadData()
        })
    },


    formClose: function () {
        this.setData({
            showForm: false
        })
    },

    cancleJoin: function () {
        // 取消报名
        var tour_id = this.data.tourId
        var _this = this
        tourApi.deleteTourMember(tour_id).then((resp) => {
            if (resp.data.status == 0) {
                wx.showToast({
                    icon: 'none',
                    title: '已取消报名',
                })
                _this.loadData()

            }
        })
    },

    formSubmit: function () {
        if (this.data.loading) {
            return
        }
        // 提交报名
        var data = {
            tour_id: this.data.tourId,
            name: this.data.name,
            mobile: this.data.mobile
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
            loading: true
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
        tourApi.createTourMember(data).then((resp) => {
            _this.setData({
                loading: false
            })
            if (resp.data.status == 0) {
                wx.showModal({
                    title: '报名成功',
                    content: '您已成功报名此次活动。',
                    showCancel: false,
                    confirmText: '知道了',
                    confirmColor: '#B20700',
                    success: (result) => {
                        if (result.confirm) {
                            _this.loadData()
                        }
                    },
                    fail: () => { },
                    complete: () => { }
                });
            }
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
            return false
        }
        if (code.length != 4) {
            wx.showModal({
                title: '验证码输入错误',
                icon: 'none'
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

    joinHandle: function (e) {
        var _this = this
        if (this.data.item.cat == 'weapp') {
            wx.navigateToMiniProgram({
                appId: _this.data.item.weapp_id,
                path: _this.data.item.weapp_path,
            })
        }

        console.log('join handle')
        this.setData({
            showForm: true,
            loading: false,
        })
    },

    loadPostInfo: function (postId) {
        var _this = this
        postApi.getPostBaseInfo(postId).then((res) => {
            if (res.data.code != 0) {
                return
            }
            var post = res.data.data
            _this.setData({
                post: post,
            })
        })
    },

    loadData: function (cb) {
        var _this = this
        tourApi.getTourDetail(_this.data.tourId).then((resp) => {
            if (resp.data.code != 0) {
                return;
            }
            var tour = resp.data.data
            var html = tour['content'] || ''
            if (html) {
                html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
                html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
            }
            var postIds = tour.post_ids ? tour.post_ids.split(",").map(Number) : []


            _this.setData({
                item: tour,
                html: html,
                loading: false,
                postIds: postIds
            })
            // 加载楼盘信息
            // _this.loadPostInfo(tour.post_id);
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
        var sharePath = '/pkgTour/pages/tour/show?id=' + this.data.tourId
        return {
            title: this.data.item.title,
            imageUrl: this.data.item.cover + "?imageView2/1/w/500/h/400",
            path: sharePath,
        }
    }
})