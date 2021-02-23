const util = require("util.js");

module.exports = {

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
