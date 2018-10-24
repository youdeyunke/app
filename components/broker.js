// components/broker.js
const app = getApp()
var auth = require('../utils/auth.js');

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    broker: {type: Object, value:null},
    pid: {type: Number, value: null},
    booking: {type: Number, value: 0},
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    callMe: function(){
      wx.makePhoneCall({
          phoneNumber: this.data.broker.mobile //仅为示例，并非真实的电话号码
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
      if (_this.data.booking == 1) {
        return false
      }
      app.request({
        url: '/api/v1/users/mark_book',
        method: 'POST',
        data: { post_id: pid },
        success: function (resp) {
          console.log('resp', resp)
          wx.showModal({
            title: '预约成功！',
            content: '经济人稍后会来电与您确认具体看房时间，请留意',
          })
          _this.setData({booking: 1})
        }
      })
    },  
  }
})
