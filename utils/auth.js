const util = require("util.js");

module.exports = {

  ensureUser: function (cb) {
    var _this = this
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    wx.checkSession({
      success: function(){
        if(userInfo && token){
          typeof cb == 'function' && cb(userInfo)
        }else{
          _this.gotoAuth()
        }
      },
      fail: function(){
        _this.gotoAuth()
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
