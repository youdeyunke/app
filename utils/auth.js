
module.exports = {

  ensureMobile: function(cb){
    // 确保用户已经填写手机号
    var _this = this
    this.ensureUser(function(userInfo){
        if(userInfo.mobile){
          return cb(userInfo)
        }
        // 去绑定手机号
        _this.gotoAccount('请先绑定手机号', '请先绑定您的手机号，以便我们能联系您')
    })
  },

  ensureUser: function (cb) {
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    wx.checkSession({
      success: function(){
        if(userInfo && token){
          typeof cb == 'function' && cb(userInfo)
        }else{
          this.gotoAuth('请先登录', '请先登录')
        }
      },
      fail: function(){
        this.gotoAuth('请先登录', '请先登录')
      },
    })
  },

  gotoAuth: function(title, content){
    wx.navigateTo({url: '/pages/auth/index'})
  },

  loadUserInfo: function (cb) {
      return this.getRemoteUserInfo(cb)
  },

  getRemoteUserInfo: function(cb){
    /* 从服务器获取用户信息 */
    const that = getApp()
    that.request({
      url: '/api/v1/users/myself',
      success: function(resp){
        if(resp.data.status == 0){
          var user = resp.data.data
          typeof cb == "function" && cb(user)
        }
      },
    })
  },

}
