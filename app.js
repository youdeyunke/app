//app.js
var auth = require('utils/auth.js');


App({

  globalData: {
    apiHost: 'https://fang.udeve.cn',
    //apiHost: 'http://dockerhost:9001',
    userInfo: null,
    token: null,
    loadingStatus: 0,
    cities: [],
    qqMapAppKey: 'OH2BZ-7QJK6-L44SI-MEJFO-PJNH2-IABHQ',
    serverMobile: '15150416776'
  },

  loadCities: function (cb) {
    if(this.globalData.cities && this.globalData.cities.length > 0){
      console.log('global data c', this.globalData.cities)
      return cb(this.globalData.cities)
    }

    var _this = this
    this.request({
      url: '/api/v2/cities',
      success: function (resp) {
        _this.globalData.cities = resp.data.data
        return cb(resp.data.data)
      }
    })
  },      

  loadPosts: function(that){
    if(!that.data.hasMore){
      return false
    }
    var query = {
      //city_id: that.data.city_id || '',
      offset: that.data.offset || 0,
      limit: that.data.limit || 0,
      group: that.data.group || 'all',
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


  onLaunch: function () {
    var _this = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    this.loadCities(function(cities){
      _this.globalData.cities = cities
    })
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
      success: function (resp){
        // 清空缓存
        wx.setStorageSync('formids', [])
      }
    })    
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
    var url = this.globalData.apiHost + obj.url

    wx.request({
      url: url,
      data: obj.data || {},
      method: obj.method || 'GET',
      header: header,
      success: function(res) {
        if(typeof res != "object"){
          console.log('server error')
        }

        if([2000, 2001].includes(res.data.status)){
          console.log('login required')
          // token 过期
          wx.setStorageSync('userInfo', null)
          wx.setStorageSync('token', null)               
          auth.gotoAccount('需要登录', '请先登录账号')
          return false
        }
        if(res.data.status == 1 && res.data.error){
          wx.showModal({
              title: '温馨提示',
              content: res.data.error,
          })
        }

        typeof obj.success == "function" && obj.success(res)
      },
      fail: function(res) {
        console.log('request fail', res)
      },
      complete: function() {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        typeof obj.complete == "function" && obj.complete()
      }
    })
  },


})
