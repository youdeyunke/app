// pages/myself/myself.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        cells: [{
                icon: "newspaper-o",
                name: '我的房源',
                url: '/pages/myself/posts',
            },
            {
                icon: "chat-o",
                name: '我的提问',
                url: '/pages/myself/qa',
            },
            {
                icon: "comment-o",
                name: '我的评论',
                url: '/pages/comments/index?myself=true&limit=10000"',
            },
            {
                icon: "eye-o",
                name: '我的关注',
                url: '/pages/myself/favposts'
            },
            //{ icon:"pause-circle-o",  name: '退出登录',  bindtap:"logoutHandle", loginRequired: true},
            //{ icon:"service-o", name: '联系客服',  url: '/pages/about/index'},
        ],
    },

    getPhoneNumber: function (e) {

        if (!e.detail.iv) {
            this.setData({
                mobile: ' '
            })
            return false
        }

        if (this.data.mobile) {
            return false
        }

        wx.showLoading({
            title: '处理中',
            mask: true
        })
        var token = wx.getStorageSync('token')
        var that = this
        app.request({
            method: 'POST',
            url: '/api/v1/users/bind_xcx_mobile',
            data: {
                'iv': e.detail.iv,
                'encryptedData': e.detail.encryptedData
            },

            success: function (res) {
                if (res.data.status != 0) {
                    wx.showModal({
                        content: '服务器出现错误，请稍后再试',
                        showCancle: false
                    })
                } else {
                    // 绑定手机号成功
                    that.setData({
                        userInfo: res.data.data
                    })
                    wx.setStorageSync('userInfo', res.data.data)
                    console.log(that.data.mobile)
                    wx.showToast({
                        title: '绑定手机号成功',
                    })
                    app.loginBack()
                }
            }
        })
    },

    gotoTerms: function (e) {
        wx.navigateTo({
            url: '/pages/static/terms'
        })
    },

    gotoMembership: function(e){
        // 开通经纪人身份
        var url = '/pages/myself/broker'
        var b = this.data.userInfo.broker_profile
        if(b.name && b.mobile && b.company ){
            url = '/pages/broker/membership'
        }
        wx.navigateTo({url: url})
    },

    logoutHandle: function (e) {
        wx.setStorageSync('userInfo', null)
        wx.setStorageSync('token', null)
        this.setData({userInfo: null })
        this.setData({userInfo: null })
        this.setNavColor(false)
    },

    loginHandle: function (e) {
        var _this  = this
        auth.loginHandle(this, e, function(u){
            _this.setNavColor(u)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        // 未登录时候标题栏为灰色，登录后为白色
        wx.setNavigationBarTitle({title: '我的'})
        if(this.data.userInfo.id){
            this.getRemoteUserInfo()
        }
    },

    getRemoteUserInfo: function () {
        var _this = this
        auth.getRemoteUserInfo(function (user) {
            _this.setData({
                userInfo: user
            })
            wx.setStorage({
                key: 'userInfo',
                data: user
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    setNavColor: function(isUser){
        // dark
        var frontColor = '#000000'
        var bgColor = '#f3f5f7'
        var duration =  0
        if(isUser){
            bgColor = '#ffffff'
            duration = 500
        }

        wx.setNavigationBarColor({
          frontColor: frontColor,
          backgroundColor: bgColor,
          animation: {
            duration: duration,
            timingFunc: 'easeIn'
          }
        })        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var u = wx.getStorageSync('userInfo')
        this.setData({userInfo: u })
        this.setNavColor(u)

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
        this.getRemoteUserInfo()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})