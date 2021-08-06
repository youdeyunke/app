const util = require("util.js");

module.exports = {

    setUserInfo: function(token, user){
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

    logout: function(){
        // 退出登陆，清空token和缓存信息 
        const app = getApp()  
        app.globalData.userInfo = null 
        app.globalData.token = null 
        wx.setStorage({key: 'userInfo', data: null})
        wx.setStorage({key: 'token', data: null })
    },


    ensureUser: function (cb) {
        const app = getApp()
        var _this = this
        var token = app.globalData.token
        var user = app.globalData.userInfo
        // 去登录页面
        if (!token) {
            console.log('没有从globalData中获取到token,跳转到登录页面', app.globalData)
            this.gotoAuth()
            return
        }
        return typeof cb == 'function' && cb(user)
    },

    gotoAuth: util.throttle(function (e) {
        console.log('由截流函数执行')
        wx.navigateTo({ url: '/pkgAuth/pages/auth/index' })
    }, 1000),


    loadUserInfo: function (cb) {
        return this.getRemoteUserInfo(cb)
    },

    getRemoteUserInfo: function (cb) {
        /* 从服务器获取用户信息 */
        const that = getApp()
        that.request({
            url: '/api/v1/users/myself',
            hideLoading: true,
            success: function (resp) {
                if (resp.data.status == 0) {
                    var user = resp.data.data
                    typeof cb == "function" && cb(user)
                }
            },
        })
    },

}
