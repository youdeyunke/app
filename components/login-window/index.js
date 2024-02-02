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
const auth = require("../../utils/auth")
// components/login-window/index.js
const app = getApp()

Component({
    /**   
     * 组件的属性列表
     */
    properties: {
        closable: { type: Boolean, value: false },
    },

    ready: function () {
        this.setData({
            bg: app.globalData.myconfigs.ui.login_window || 'https://qiniucdn.udeve.net/fang/login-window.png',
            primaryColor: app.globalData.myconfigs.color.primary || '#1989fa',
            primaryBtnColor: app.globalData.myconfigs.color.primary_btn || 'linear-gradient(270deg, #1989FA 0%, rgba(25, 137, 250, 0.6) 100%)',
        })
        var _this = this

    },

    detached(){
      app.globalData.loginWindowShowStatus = false
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        show: false,
        bg: null,
        primaryColor: '#1989fa',

    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoSms: function () {
            if (this.data.loading) {
                return
            }
            wx.navigateTo({
                url: '/pkgAuth/pages/auth/sms'
            })
        },
        loginHandle: function (e) {
            this.setData({
                loading: true
            })
            // 防止一直转圈 
            var _this = this
            setTimeout(() => {
                _this.setData({
                    loading: false,
                    closable: true
                })
            }, 5000)

            var code = this.data.code
            auth.loginHandle(code, e, (token) => {
                app.setUserInfo()
                this.triggerEvent('success', "ok")
                this.closeWindow()
            })
        },

        closeWindow: function () {

            this.setData({
                show: false,
                loading: false,
            })
            app.globalData.loginWindowShowStatus = false
        },



        openWindow: function () {
            if (app.globalData.loginWindowShowStatus){
              return
            }
            if (this.data.show == true) {
                return false
            }
            this.setData({
                show: true,
                loading: false,
            })
            app.globalData.loginWindowShowStatus = true
            var _this = this
            wx.login({
                success: function (res) {
                    _this.setData({
                        code: res.code
                    })
                },
                complete: function (res) {
                    // 用户拒绝,跳转到设置界面
                    if (res.errMsg == 'getUserInfo:fail auth deny') {
                        wx.openSetting({})
                    }
                }
            })

        },

    }
})