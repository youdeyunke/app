//app.js

App({

  globalData: {
    userInfo: null,
    token: null,
    loadingStatus: 0,
    cities: [],
    serverMobile: '4008627058'
  },

  loadPosts: function(that){
    if(!that.data.hasMore){
      return false
    }
    var query = {
      city_id: that.data.city_id || '',
      offset: that.data.offset || 0,
      limit: that.data.limit || 0,
    }
    var _this = this
    this.request({
      url: '/api/v1/posts',
      data: query,
      success: function(resp){
        console.log('app.resp', resp)
        var d = {}
        if(resp.data.data.length == 0 ){
          d.hasMore = false
        }else{
          var k = "posts[" + that.data.offset + "]"
          d[k] = resp.data.data
        }
        d.offset = resp.data.paginate.offset
        that.setData(d)

      }
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


  onLaunch: function () {
    var _this = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
  },

  saveFormId: function(e){
    return this.uploadFormId(e)
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

  ensureUser: function (cb) {
    // obj like {success: function(uinfo){...}, login_back: '/pages/index/index', }
    var _this = this
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    if (token && userInfo) {
      if(typeof cb != 'undefined'){
        return cb(userInfo)
      }
      return  null
    } 
    _this.gotoAccount('请先登录', '请先登录')
    
  },

  setLoginBack: function(eb){
    return wx.setStorageSync('login_back', eb)
  },

  loginBack: function(){
    // 回到登录前页面
    var eb = wx.getStorageSync('login_back')
    if(eb.key && eb.value){
      if(eb.key == 'redirect'){
        wx.redirectTo({
          url: eb.value,
        })
      }if(eb.key == 'switch'){
        wx.switchTab({
          url: eb.value
        })
      }
      wx.setStorage({
        key: 'login_back',
        data: null,
      })
    }
  },


  ensureMobile: function(cb){
    // 确保用户已经填写手机号
    var _this = this
    _this.ensureUser(function(userInfo){
        if(userInfo.mobile){
          return cb(userInfo)
        }
        // 去绑定手机号
        _this.gotoAccount('请先绑定手机号', '请先绑定您的手机号，以便我们能联系您')
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
    var defaultApiHost = 'http://47.96.69.232:9000/haofang'
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
