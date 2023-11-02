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
const throttle = require("throttle.js");
const smsApi = require("../api/sms")
const userApi = require("../api/user")
const sessionApi = require("../api/session")
module.exports = {

    setUserToken: function (token) {
        // 保存下服务器返回的token
        const app = getApp()
        // 设置本地缓存
        wx.setStorageSync('token', token)
        // 在globalData中标记登录状态
        app.globalData.token = token;
        app.globalData.LOGIN_FLAG = 1;
        // 设置回退刷新数据 
        app.globalData.backToReload = true
    },



    smsLoginHandle (phone, code, cb) {
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
        smsApi.smsAuth(phone, code).then((res) => {
            var data = res.data
            if (data.code == 0) {
                // 保存下服务器返回的token
                var token = data.data
                _this.setUserToken(token)
                _this.setUserInfo(cb);
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

        // 发送给服务器

        sessionApi.wechatLogin(code, encryptedData, iv).then((resp) => {
            var data = resp.data
            if (data.code == 0) {
                // 保存下服务器返回的token
                // TODO 拉取用户资料
                var token = data.data
                _this.setUserToken(token)
                _this.setUserInfo(cb);

            } else {
                wx.showToast({
                    icon: "none",
                    title: '授权失败',
                })
            }
        })
    },

    logout: function () {
        // 退出登陆，清空token和缓存信息 
        const app = getApp()
        wx.setStorage({
            key: 'userInfo',
            data: null
        })
        wx.setStorage({
            key: 'token',
            data: null
        })
        app.LOGIN_FLAG = 0; // 登录标志位
    },


    ensureUser: function (cb) {
        const app = getApp()
        var _this = this
        var user = wx.getStorageSync('userInfo')

        // 去登录页面
        if (app.globalData.LOGIN_FLAG != 1) {
            console.log('没有从globalData中获取到token,跳转到登录页面', app.globalData)

            throttle.throttle(function (e) {
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


    setUserInfo: function (cb) {
        /* 从服务器获取用户信息并保存到localstorage中 */
        userApi.getMyselfInfo().then((resp) => {
            if (resp.data.code != 0) {
                console.log("拉取当前登录用户信息时候出错，请检查loadUserInfo方法")
                return false;
            }
            var user = resp.data.data
            // 存入本地
            wx.setStorageSync('userInfo', user);
            typeof cb == "function" && cb(user)
        })
    },

}