const util = require("util.js");

module.exports = {

  ensureUser: function (cb) {
    const app = getApp()
    var _this = this
    var token = app.globalData.token
    var user = app.globalData.userInfo
    // 去登录页面
    if(!token){
        this.gotoAuth()
        return
    }
    
    // 检查微信的session是否有效
    wx.checkSession({
      success: function(){
          return typeof cb == 'function' && cb(user)
      },
      fail: function(){
        _this.gotoAuth()
        return 
      },
    })
  },

  gotoAuth: util.throttle(function(e){
    console.log('由截流函数执行')
    wx.navigateTo({ url: '/pages/auth/index' })
  }, 1000),


  loadUserInfo: function (cb) {
      return this.getRemoteUserInfo(cb)
  },

  getRemoteUserInfo: function(cb){
    /* 从服务器获取用户信息 */
    const that = getApp()
    that.request({
      url: '/api/v1/users/myself',
      hideLoading: true,
      success: function(resp){
        if(resp.data.status == 0){
          var user = resp.data.data
          typeof cb == "function" && cb(user)
        }
      },
    })
  },

}
