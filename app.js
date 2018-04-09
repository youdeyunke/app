//app.js

App({

  globalData: {
    userInfo: null,
    token: null,
    loadingStatus: 0,
    cities: [],
    serverMobile: '4008627058'
  },

  comingSoon: function(){
    wx.showToast({
      title: '功能正在完善中，很快就好哦 :)',
      icon: 'none',
      duration: 2000
    })    
  },

  loadCities: function(cb){
    var _this = this
    this.request({
      url :'/api/v1/cities',
      success: function(resp){
        typeof cb == 'function' && cb(resp.data.data)
      }
    })
  },

  loadPosts:function(query, cb){
    console.log('query.. ', query)
    this.request({
      url: '/api/v1/posts',
      data: query,
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
          console.log('login code: ',code ,res)

          if(code){
            // 获取用户信息
            wx.getUserInfo({
              success: function (res) {
                // 发送给服务器,换取token
                that.getSessionToken(code, res.encryptedData, res.iv, cb)
              },
              complete: function(res){
                // 用户拒绝,跳转到设置界面
                console.log('getUserInfo complete,', res)
                if (res.errMsg == 'getUserInfo:fail auth deny'){
                  wx.openSetting({})
                } 
              }
            })
          }
        },
      
      })
    }
  },

  sendSms: function(mobile, cb){
    var _this = this
    _this.request({
      url: '/api/v1/sms/sendto',
      data: {mobile: mobile},
      success: function(resp){
        console.log('send sms resp', resp)
      }
    })
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

  gotoAccount: function(title, content){
    wx.showModal({
      title: title,
      content: content,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({ url: '/pages/myself/myself' })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
    
    
    // This must be wx.request !
    var defaultApiHost = 'https://www.jiayaosu.com/haofang'
    //var defaultApiHost = 'http://localhost:3000/haofang'
    var customApiHost = wx.getStorageSync('apiHost')
    var apiHost = customApiHost ||defaultApiHost
    var url = apiHost + obj.url
    console.log('default api host, ', defaultApiHost)
    console.log('custom api host, ', customApiHost)
    console.log('api host, ', apiHost)
    console.log('app.request, url:', url)

    wx.request({
      url: url,
      data: obj.data || {},
      method: obj.method || 'GET',
      header: header,
      success: function(res) {
        wx.hideLoading()
        console.log(res.data)

        if(typeof res != "object"){
          console.log('server error')
        }

        if([2000, 2001].includes(res.data.status)){
          console.log('login required')
          _this.gotoAccount('需要登录', '请先登录账号')
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
