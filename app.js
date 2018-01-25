//app.js

App({
  getUserInfo:function(cb){
    var _this = this
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
                var userInfo = res.userInfo                              
                console.log('wx response res', res)
                _this.globalData.userInfo = userInfo
                typeof cb == "function" && cb(_this.globalData.userInfo)

                // 发送给服务器
                wx.request({
                  url: _this.globalData.apiHost + '/wechatapp/auth',
                  data: {code: code, res: res},
                  method: 'POST',
                  success: function(res){
                    var rdata = res.data
                    console.log('auth response ', rdata)

                    if(rdata.status == 0){
                      console.log('save token', rdata.data.token)
                      // 保存下服务器返回的token
                      wx.setStorageSync('token', rdata.data.token)
                    }
                  }
                });

              }
            })
          }
        }
      })
    }
  },
  

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    apiHost: 'http://localhost:8000',
  }
})
