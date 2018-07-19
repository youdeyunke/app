
module.exports = {
  loginHandle: function(that, e){
    const app = getApp()
    var _this = this
    console.log('uinfo', e)
    if (e.detail.errMsg != 'getUserInfo:ok'){
      console.error('授权时候出错', e)
      return
    }

    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
  
    // 获取code
    wx.login({
      success: function(res){
        if(res.code){
          // 换取服务器的token
          _this.getSessionToken(res.code, encryptedData, iv, function(userInfo){
            // success
            that.setData({userInfo: userInfo})
            // login back
            app.loginBack()
          })
        }
      },
      complete: function (res) {
        // 用户拒绝,跳转到设置界面
        if (res.errMsg == 'getUserInfo:fail auth deny') {
          wx.openSetting({})
        }
      }
    })
  },

  ensureUser: function (cb) {
    // obj like {success: function(uinfo){...}, login_back: '/pages/index/index', }
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    if (token && userInfo) {
      if(typeof cb != 'undefined'){
        return cb(userInfo)
      }
      return  null
    } 
    this.gotoAccount('请先登录', '请先登录')
  },

  gotoAccount: function(title, content){
    wx.switchTab({ url: '/pages/myself/index' })
  },


  getSessionToken: function (code, encryptedData, iv, cb) {
    // 重新获取token，并刷新 user info
    const that = getApp()

    // 发送给服务器
    that.request({
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },

      method: 'POST',
      url: '/api/v1/sessions',
      success: function (resp) {
        var data = resp.data
        if (data.status == 0) {
          console.log('server response ', resp)

          // 保存下服务器返回的token
          wx.setStorageSync('token', data.data.token)
          wx.setStorageSync('userInfo', data.data.user)
          // callback
          typeof cb == "function" && cb(data.data.user)

        }
      }
    })
  }
}
