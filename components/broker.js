// components/broker.js
const app = getApp()
var auth = require('../utils/auth.js');

Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    broker: {type: Object, value:null},
    pid: {type: Number, value: null},
    booking: {type: Boolean, value: false},
    bookingEnable: {type: Boolean, value: true},
    chatEnable: {type: Boolean, value: true},
    wechatEnable: {type: Boolean, value: true},
    mobileEnable: {type: Boolean, value: true},
  },

  /**
   * 组件的初始数据
   */
  data: {
    actions: [],
    actionsShow: false,

  },

  ready: function(){
    var _this = this
    console.log("this broker info", _this.data.broker)
    var item_1 = {
      name: '拨打电话', 
      action: 'mobile', 
      disabled : !_this.data.broker.mobile  ? true : false
    }

    var item_2 = {
      name: '复制微信', 
      action: 'wechat', 
      disabled : !_this.data.broker.wechat ? true : false
    }

    var item_3 = {
      name: '在线聊天', 
      action: 'chat', 
      disabled : !_this.data.broker.id ? true : false
    }
    
    var actions = []
    if(this.data.mobileEnable){
      actions.push(item_1)
    }
    if(this.data.wechatEnable){
      actions.push(item_2)
    }
    if(this.data.chatEnable){
      actions.push(item_3)
    }

    this.setData({ actions: actions })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    connectHandle: function(e){
      this.setData({
        actionsShow: true
      })
    },

    actionsClose: function(e){
      this.setData({
        actionsShow: false
      })
    },
    
    actionClick: function(e){
      var action = e.detail.action
      var _this = this
      _this.setData({actionsShow: false})

      switch(action){
        case 'mobile':
          _this.callMe()
          break
        case 'wechat':
          _this.copyWechat()
          break
        case 'chat':
          wx.showLoading({title: '正在打开', icon: 'none', mask: true})
          // 先调用打招呼接口
          app.request({
            url: '/api/v2/posts/hello?id=' + _this.data.pid,
            success: function(resp){
              if(resp.data.status == 0 ){
                // 跳转到消息列表
                wx.redirectTo({
                  url: '/pages/messages/show?target_user_id=' + _this.data.broker.id ,
                })
              }
            },
            complete: function(){
              wx.hideLoading()
            },
          })

          break
      }
    },

    copyWechat: function(){
      var wechat = this.data.broker.wechat
      if(!wechat){
        return false
      }
      this.setData({actionsShow: false})

      wx.setClipboardData({
        data:  wechat,
        success: function(res){
          wx.showToast({
            title: '微信号已复制',
            icon: 'none',
          })
        }
      })

    },

    callMe: function(){
      var mobile = this.data.broker.mobile
      if(!mobile){
        return false
      }

      wx.makePhoneCall({
          phoneNumber: mobile 
      })
    },

    bookingHandle: function () {
      var _this = this
      auth.ensureMobile(function (userInfo) {
        app.ensureLocation(function(){
          _this._bookingHandle()
        })
      })
    },

    _bookingHandle: function () {
      var pid = this.data.pid
      var _this = this
      var location = wx.getStorageSync('location')
      if (_this.data.booking) {
        return false
      }
      // 模拟需要付费的方式

      app.request({
        url: '/api/v1/users/mark_book',
        method: 'POST',
        data: { post_id: pid , location: location},
        success: function (resp) {
          console.log('resp', resp)
          if(resp.data.status == 0){
            wx.showModal({
              title: '预约成功！',
              content: '经济人稍后会来电与您确认具体看房时间，请留意',
            })
            _this.setData({booking: true})
          }
        }
      })
    },  
  }
})
