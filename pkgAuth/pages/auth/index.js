// pages/myself/myself.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ui: {},
        allowTerms: false, 
        code: null,
        loading: false,
        show:true
    },


    loginHandle: function (e) {
        var _this = this
        if(!this.data.allowTerms){
            wx.showToast({
              title: '请同意用户协议，才能正常登陆账号哦',
              icon: 'none'
            })
            return
        }
        // 注意，code 需要在getUserInfo之前获取到，否则会导致登录失败
        // 2中登录方式，api/v1 : 账号授权登录    api/v2： 手机号授权登录
        var code = _this.data.code
        if (e.detail.errMsg != 'getUserInfo:ok' && e.detail.errMsg != 'getPhoneNumber:ok') {
            console.log(e.detail.errMsg)
            wx.showModal({
                title: '操作失败',
                content: '请允许微信授权，才能正常登陆账号哦',
                showCancle: false
            })
            console.error('授权时候出错', e)
            return
        }

        var encryptedData = e.detail.encryptedData
        var iv = e.detail.iv

        // 换取服务器的token
        this.setData({ loading: true })
        this.getSessionToken(code, encryptedData, iv, function (userInfo) {
            console.log('code is', code)
            var pages = getCurrentPages()
            if (pages.length == 1) {
                wx.switchTab({ url: '/pages/myself/index' })
            } else {
                wx.navigateBack({ delta: 1 })
            }
        })
    },


    getSessionToken: function (code, encryptedData, iv, cb) {
        // 重新获取token，并刷新 user info
        var _this = this
        var data = { code: code, encryptedData: encryptedData, iv: iv }
        data['referrer_id'] = wx.getStorageSync('referrer_id') || ''
        // 如果有推荐人信息
        if (data['referrer_id']) {
            console.log('检测到推荐人id：', data)
        }

        // 发送给服务器
        app.request({
            data: data,
            method: 'POST',
            url: '/api/v2/sessions',
            hideLoading: true,
            success: function (resp) {
                var data = resp.data
                if (data.status == 0) {
                    // 保存下服务器返回的token
                    var token = data.data.token
                    var user = data.data.user
                    wx.setStorageSync('token', token)
                    wx.setStorageSync('userInfo', user)
                    // 在globalData中标记登录状态
                    app.globalData.token = token
                    app.globalData.userInfo = user
                    // callback
                    typeof cb == "function" && cb(user)
                }
            }
        })
    },


    termsHandle: function(){
        this.setData({
            allowTerms: !this.data.allowTerms,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 进入登录页面，先清空当前的用户缓存
        app.globalData.userInfo = null
        app.globalData.token = null
        wx.setStorageSync("userInfo", null);
        wx.setStorageSync("token", null);
      
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this
        this.setData({ loading: false })
        app.ensureConfigs(function (configs) {
            var ui = configs.ui
            var color = configs.color 
            _this.setData({ 
                headerImg:  ui.login_header,
                bodyImg: ui.login_body ,  
                primaryBtnColor:  color.primary_btn, 
                primaryColor: color.primary,
            })
        })

        wx.login({
            success: function (res) {
                _this.setData({ code: res.code })
            },
            complete: function (res) {
                // 用户拒绝,跳转到设置界面
                if (res.errMsg == 'getUserInfo:fail auth deny') {
                    wx.openSetting({})
                }
            }
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
