//app.js

App({

  globalData: {
    userInfo: null,
    token: null,
    apiHost: 'http://localhost:3000',
  },

  onLaunch: function () {
    var _this = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    this.globalData.token = wx.getStorageSync('token')    
    this.globalData.userInfo = wx.getStorageSync('userInfo')

  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{

      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code

          if(code){
            // 获取用户信息
            wx.getUserInfo({
              success: function (res) {
                // 发送给服务器,换取token
                that.getSessionToken(code, res.encryptedData, res.iv, cb)
              }
            })
          }
        }
      })
    }
  },
  

  getSessionToken: function(code, encryptedData, iv, cb){
    // 重新获取token，并刷新 user info
    var _this = this

    // 发送给服务器
    wx.request({
      data: { 
        code: code, 
        encryptedData: encryptedData, 
        iv: iv
      },

      method: 'POST',
      url: _this.globalData.apiHost + '/api/v1/sessions',
      success: function (resp) {
        var data = resp.data

        if (data.status == 0) {
          console.log('server response ', resp)

          // 保存下服务器返回的token
          wx.setStorageSync('token', data.data.token)
          wx.setStorageSync('userInfo', data.data.user)

          // refresh global data
          _this.globalData.token = data.data.token
          _this.globalData.userInfo = data.data.user

          // callback
          typeof cb == "function" && cb(_this.globalData.userInfo)

        }
      }
    });    
  },


})
