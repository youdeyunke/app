//app.js

App({

  globalData: {
    userInfo: null,
    token: null,
    loadingStatus: 0,
    apiHost: 'http://localhost:3000',
  },

  loadPosts:function(data, cb){
    this.request({
      url: '/api/v1/posts',
      data: data,
      success: function(resp){
        typeof cb == "function" && cb(resp.data)
      },
    })
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
    _this.request({

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

          // refresh global data
          _this.globalData.token = data.data.token
          _this.globalData.userInfo = data.data.user

          // callback
          typeof cb == "function" && cb(_this.globalData.userInfo)

        }
      }
    });    
  },

  authRequired: function(){
  },

  request: function(obj) {
    var _this = this

    wx.showLoading({
      title: '加载中',
      mask: false
    })

    var header = obj.header || {}
    if (!header['Content-Type']) {
      header['Content-Type'] = 'application/json'
    }
    if (!header['Authorization']) {
      header['Authorization'] = this.globalData.token
    }
    
    // 如果接口需要登录
    if(obj.authRequired && !_this.globalData.token){
      return  _this.authRequired()
    }

    // This must be wx.request !
    var url = _this.globalData.apiHost + obj.url
    console.log('app.request, url:', url)

    wx.request({
      url: url,
      data: obj.data || {},
      method: obj.method || 'GET',
      header: header,
      success: function(res) {
        wx.hideLoading()
        console.log(res.data)
        if(res.data.status == 2000){
          console.log('login required')
          wx.showModal({
            title: '需要登录',
            content: '请先登录账号，再继续操作',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({ url: '/pages/myself/myself' })

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

          return false
        }

        typeof obj.success == "function" && obj.success(res)
      },
      fail: function() {
        wx.hideLoading()
      },
      complete: function() {
        wx.hideLoading()
        typeof obj.complete == "function" && obj.complete()
      }
    })
  },


})
