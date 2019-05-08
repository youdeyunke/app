//app.js
var auth = require('utils/auth.js');

App({

  globalData: {
    //apiHost: 'https://fang.udeve.cn',
    apiHost: 'http://localhost:9000',
    userInfo: null,
    token: null,
    loadingStatus: 0,
    cities: [],
    qqMapAppKey: 'OH2BZ-7QJK6-L44SI-MEJFO-PJNH2-IABHQ',
    serverMobile: '',
    filterAreaItem: {
      type: 'picker',
      name: '面积',
      key: 'area',
      options: [
        { label: '不限', value: '' },
        { label: '0~50㎡', value: '0,50' },
        { label: '50~100㎡', value: '50,100' },
        { label: '100~150㎡', value: '100,150' },
        { label: '150~200㎡', value: '150,200' },
        { label: '200㎡以上', value: '200,99999' },
      ]
    },
    filterRentPriceItem: {
      type: 'picker',
      name: '价格',
      key: 'rent_price',
      options: [
        { label: '不限', value: '' },
        { label: '0~3元 / ㎡天', value: '0,3' },
        { label: '3~4元 / ㎡天', value: '3,4' },
        { label: '4~5元 / ㎡天', value: '4,5' },
        { label: '5~7元 / ㎡天', value: '5,7' },
        { label: '7~9元 / ㎡天', value: '7,9' },
        { label: '9~12元 / ㎡天', value: '9,12' },
        { label: '12元以上 / ㎡天', value: '12,999' },
      ]
    },
    filterOrderItem: {
      type: 'picker',
      name: '排序',
      key: 'order',
      options: [
        { label: '默认', value: 'id desc' },
        { label: '面积（从大到小)', value: 'area desc' },
        { label: '面积（从小到大)', value: 'area asc' },
        { label: '租金（从小到大)', value: 'rent_price  asc' },
        { label: '租金（从大到小)', value: 'rent_price desc' },
      ]
    }    
  },

  ensureLocation: function(cb){
    // 确保能获取用户位置信息
    var _this = this
    var location = wx.getStorageSync('location')

    if(!location){
      // 打开获取位置信息界面
      wx.openSetting({success: function(setting) {
        var value = setting.authSetting['scope.userLocation']
        if(value){  _this.getLocation() }
      }})

      wx.showToast({
        title: '请允许获取位置信息',
        icon: 'none',
        duration: 2000,
        success: function(){
        }
      })

    }

    if(location){
      return cb(location)
    }
  },

  getLocation: function(){
    // 先获取经纬度
    var _this = this
    wx.getLocation({
      success: function (res) {
        //保存到data里面的location里面
        var lng = res.longitude
        var lat = res.latitude
        var locationStr = lat + ',' + lng
        wx.setStorageSync('location', locationStr)
      },
      complete: function(){
      },
    })
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

  cachePosts: function(posts){
    // 在列表页面中，缓存房源详情信息
    var _this = this
    posts.forEach(function(post, i){
      var pid = post.id
      var key = 'post.data.' + pid
      var _post = wx.getStorageSync(key)
      if(!_post){
        _this.request({
          url: '/api/v2/posts/' + pid,
          hideLoading: true,
          success: function(resp){
            var post = resp.data.data
            wx.setStorage({key: key, data: post})
            console.log('cached post.id', pid)
          }
        })
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
          _this.cachePosts(resp.data.data)
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


  startReddotInterval: function(){
    return false

    var _this = this
    var key = 'reddot.inteval'
    var iid = wx.getStorageSync(key)
    if(iid){
      clearInterval(iid)
    }
    console.log('开始检查红点')
    iid = setInterval(_this.getReddot, 15000)
    wx.setStorageSync(key, iid)
  },

  getReddot: function(){
    return false
    
    var _this = this
    this.request({
      url: '/api/v1/chat_lists/reddot',
      hideLoading: true,
      success: function(resp){
        if(resp.data.data == 1){
          console.log('显示红点')
          wx.showTabBarRedDot({
            index: 1
          })
        }
      },
    })
    
  },


  onLaunch: function () {
    var _this = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    this.getReddot()
    this.startReddotInterval()
    this.loadCities(function(cities){
      _this.globalData.cities = cities
      _this.getLocation()
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

        if(res.data.status == 888){
          // 调起支付
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function(wxpay_res){
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              })
              typeof obj.success == "function" && obj.success(res)
              return true
            },
            fail: function(wxpay_res){
              wx.showModal({
                  title: '支付失败',
                  content: '支付失败，请重试',
              })
              typeof obj.fail == "function" && obj.success(res)
              return false
            }
          })
        }

        if(res.data.status == 889){
          var error = res.data.error
          wx.showModal({
              title: '支付失败',
              content: error,
          })
          return false
        }

        if(res.data.status == 444){
          var error = res.data.error 
          wx.redirectTo({
            url: '/pages/444/index?error=' + error,
          })
          return false
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
