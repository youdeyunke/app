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
    booking: {type: Number, value: 0},
    bookingEnable: {
      type: Boolean, value: true,
    },
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

    this.setData({
      actions: [item_1, item_2]
    })

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

      switch(action){
        case 'mobile':
          _this.callMe()
          break
        case 'wechat':
          _this.copyWechat()
          break
        case 'chat':
          wx.navigateTo({
            url: '/pages/messages/show?target_user_id=' + _this.data.broker.id,
          })
          break
      }
    },

    copyWechat: function(){
      var wechat = this.data.broker.wechat
      if(!wechat){
        return false
      }

      wx.setClipboardData({
        data:  wechat,
        success: function(res){
          wx.showTosta({
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
        _this._bookingHandle()
      })
    },

    _bookingHandle: function () {
      var pid = this.data.pid
      var _this = this
      var location = wx.getStorageSync('baidu_location')
      console.log('baidu location ', location)

      if (_this.data.booking == 1) {
        return false
      }
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
            _this.setData({booking: 1})
          }
        }
      })
    },  
  }
})
