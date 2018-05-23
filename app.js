//app.js

App({

  globalData: {
    userInfo: null,
    token: null,
    loadingStatus: 0,
    cities: [],
    serverMobile: '4008627058'
  },
  
  navigateToVideo: function(){
    console.log('navigate to video')
    wx.setStorageSync('login_back_navigate_to_video', null)
    wx.navigateToMiniProgram({
      appId: 'wxae515be8cfd1d1bc',
      path: 'page/home/content/content_video/content_video?id=v_5adefeda59fc1_nbehPpsv'
    })
  },

  comingSoon: function(){
    wx.showToast({
      title: '功能正在完善中，敬请期待 :)',
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
  },

  uploadFormId: function(e){
    // 保存formid

    var _this = this
    var token = wx.getStorageSync('token')
    var ids = wx.getStorageSync('formids') || []

    if(e){
      var formId = e.detail.formId
      ids.push(formId)
    }

    if (!token) {
      // 如果没有登录，就保存到本地
      wx.setStorageSync('formids', ids)
      return false
    }

    _this.request({
      hideLoading: true,
      url: '/api/v1/formid/',
      data: { formids: ids },
      method: 'POST',
      success: function (resp) {
        // 清空缓存
        wx.setStorageSync('formids', [])
      }
    })    
  },  


  ensureMobile: function(backPage, cb=null){
    // 确保用户已经填写手机号
    var _this = this
    this.getUserInfo(function(userInfo){
      console.log('ensure mobile', userInfo)      
      if(userInfo && userInfo.mobile){
        if(typeof cb == 'function'){
          return cb(userInfo)
        }else{
          return userInfo
        }
      }else{
        // 去验证手机号
        console.log('no userinfo', userInfo)
        wx.setStorageSync('login_back_page', backPage)   
        _this.gotoAccount("请先登录", "请先登录")   
      }
    })
  },

  loadUserInfo: function(cb){
    // 从服务器拉去用户信息
    var _this  = this
    _this.request({
      url: '/api/v1/sessions/',
      success: function(resp){
        if(resp.data.status != 0){
          return cb({})
        }
        // 更新到本地数据
        var userInfo = resp.data.data
        wx.setStorageSync('userInfo', userInfo)
        console.log('sync user info to local success', userInfo)
        return cb(userInfo)
      }
    })
  },

  getUserInfo:function(cb){
    var that = this
    var token =  wx.getStorageSync('token')
    var userInfo =  wx.getStorageSync('userInfo')

    if(token && userInfo){
      // 如果token，存在，就从服务器取得
      return cb(userInfo)

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
    var token = wx.getStorageSync('token')
    if(!obj.hideLoading){
      wx.showLoading({
        title: '加载中',
        mask: false
      })
    }

    var header = obj.header || {}
    if (!header['Content-Type']) {
      header['Content-Type'] = 'application/json'
    }
    if (!header['Authorization']) {
      header['Authorization'] = token
    }
    
    
    // This must be wx.request !
    var defaultApiHost = 'https://www.jiayaosu.com/haofang'
    var defaultApiHost = 'http://localhost:3000/haofang'
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
          // token 过期
          wx.setStorageSync('userInfo', null)
          wx.setStorageSync('token', null)               
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
