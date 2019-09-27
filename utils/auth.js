
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
          _this.gotoAuth('请先登录', '请先登录')
        }
      },
      fail: function(){
        _this.gotoAuth('请先登录', '请先登录')
      },
    })
  },

  gotoAuth: function(title, content){
    wx.showModal({
      title: title,
      content: content,
      confirmText: '马上登录',
      confirmColor: '#00ae66',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          wx.navigateTo({ url: '/pages/auth/index' })
        } else if (res.cancel) {
          wx.navigateBack({ delta: -1 })
        }
      }
    })


   
  },

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
