/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
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
        closable: { type: Boolean, value: true },
    },

    ready: function () {
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                primaryColor: myconfigs.color.primary || '#1989fa',
                primaryBtnColor: myconfigs.color.primary_btn || 'linear-gradient(270deg, #1989FA 0%, rgba(25, 137, 250, 0.6) 100%)',
                secondaryBtnColor: myconfigs.color.secondary_btn,
            })
        })
        wx.getSystemInfo({
            success (res) {
                console.log(res.environment)
                if(res.environment == 'wxwork'){
                    _this.setData({
                        is_wxwork: true
                    })
                }
            }
        })
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
        bg: 'https://qiniucdn.udeve.net/fang/login-window.png',
        primaryColor: '#1989fa',
        secondaryBtnColor: "#3a67c0",
        primaryBtnColor: 'linear-gradient(270deg, #1989FA 0%, rgba(25, 137, 250, 0.6) 100%)',
        is_wxwork: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {

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
            if (app.globalData.LOGIN_FLAG == 1){
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