const util = require("util.js");
const smsApi = require("../api/sms")
const userApi = require("../api/user")
const sessionApi = require("../api/session")
module.exports = {
    setUserInfo: function (token, user) {
        // 用户账户登陆成功后，刷新全局用户资料信息
        // 保存下服务器返回的token
        const app = getApp()
        // 设置本地缓存
        wx.setStorageSync('token', token)
        wx.setStorageSync('userInfo', user)
        // 在globalData中标记登录状态
        app.globalData.token = token
        app.globalData.userInfo = user
        // 设置回退刷新数据 
        app.globalData.backToReload = true
    },

    smsLoginHandle(phone, code, cb) {
        // 通过短信验证码登陆账号
        var _this = this

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
        // 有待检测
        // app.request({
        //     url: '/api/v1/sms/auth有待检测',
        //     method: 'POST',
        //     data: {
        //         mobile: phone,
        //         code: code
        //     },
        //     success: function (res) {

        //     }
        // })
        smsApi.smsAuth(phone, code).then((res) => {
            var data = res.data
            if (data.status == 0) {
                // 保存下服务器返回的token
                var token = data.data.token
                var user = data.data.user
                _this.setUserInfo(token, user)
                typeof cb == "function" && cb(user)
            }

        })
    },


    loginHandle: function (code, e, cb) {
        // 微信授权登陆
        const app = getApp()
        var _this = this
        // 注意，code 需要在getUserInfo之前获取到，否则会导致登录失败
        // 2中登录方式，api/v1 : 账号授权登录    api/v2： 手机号授权登录
        if (e.detail.errMsg != 'getUserInfo:ok' && e.detail.errMsg != 'getPhoneNumber:ok') {
            wx.showModal({
                title: '操作失败',
                content: '请允许微信授权，才能正常登陆账号哦',
                showCancle: false
            })
            console.error('授权时候出错', e)
            return
        }

        // 换取服务器的token
        var encryptedData = e.detail.encryptedData
        var iv = e.detail.iv
        // 获取token，并刷新 user info
        var data = {
            code: code,
            encryptedData: encryptedData,
            iv: iv
        }
        data['referrer_id'] = wx.getStorageSync('referrer_id') || ''
        // 如果有推荐人信息
        if (data['referrer_id']) {
            console.log('检测到推荐人id：', data)
        }
        // 发送给服务器
        // √
        sessionApi.wechatLoginV2(code, encryptedData, iv).then((resp) => {
            var data = resp.data
            if (data.status == 0) {
                // 保存下服务器返回的token
                var token = data.data.token
                var user = data.data.user
                _this.setUserInfo(token, user)
                // callback
                typeof cb == "function" && cb(user)
            }
        })
    },

    logout: function () {
        // 退出登陆，清空token和缓存信息 
        const app = getApp()
        app.globalData.userInfo = null
        app.globalData.token = null
        wx.setStorage({
            key: 'userInfo',
            data: null
        })
        wx.setStorage({
            key: 'token',
            data: null
        })
    },


    ensureUser: function (cb) {
        const app = getApp()
        var _this = this
        var token = app.globalData.token
        var user = app.globalData.userInfo
        // 去登录页面
        if (!token) {
            console.log('没有从globalData中获取到token,跳转到登录页面', app.globalData)
        
            util.throttle(function (e) {
                console.log('由截流函数执行')
                wx.hideLoading()
                wx.navigateTo({
                    url: '/pkgAuth/pages/auth/index'
                })
            }, 1000)()
            return
        }
        return typeof cb == 'function' && cb(user)
    },


    loadUserInfo: function (cb) {
        return this.getRemoteUserInfo(cb)
    },

    getRemoteUserInfo: function (cb) {
        /* 从服务器获取用户信息 */
        // 有待检测    请求发送没有返回
        userApi.getMyselfInfo().then((resp) => {
            if (resp.data.status == 0) {
                var user = resp.data.data
                typeof cb == "function" && cb(user)
            }
        })
    },

}