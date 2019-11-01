// components/broker.js
const app = getApp()
var auth = require('../../utils/auth.js');

Component({
  options: { }, 
  /**
   * 组件的属性列表
   */

  properties: {
    broker: {type: Object, value:null},
    pid: {type: Number, value: null},
    bookingStatus: {type: Boolean, value: false},
  },

  /**
   * 组件的初始数据
   */
  data: {
      favStatus: 0,
      favCount: 0,
  },

  ready: function(){
    var _this = this
    this.loadFavStatus()
  },

 

  /**
   * 组件的方法列表
   */
  methods: {
    
    posterHandle: function(){
        wx.navigateTo({url: '/pages/poster/index?id=' + this.data.pid } )
    },

    loadFavStatus: function(){
        // 查询收藏状态
        var _this = this
        app.request({
          url: '/api/v2/favs/',
          hideLoading: false,
          data: { post_id: _this.data.pid },
          success: function (resp) {
              _this.setData({
                  favStatus: resp.data.data.status,
                  favCount: resp.data.data.count,
              })
          },
        })
    },

    favHandle: function(e){
      app.uploadFormId(e)
      var pid = this.data.pid
      var _this = this
      auth.ensureUser(function(userInfo){
          app.request({
            url: '/api/v2/favs/',
            hideLoading: false,
            method: 'POST',
            data: { post_id: pid },
            success: function (resp) {
              _this.setData({
                  favStatus: resp.data.data.status,
                  favCount: resp.data.data.count,
              })
            }
          })      
      })
    },


    chatHandle: function(){
      // 先调用打招呼接口
      wx.showLoading({title: '正在打开', icon: 'none', mask: true})
      var _this = this
      app.request({
        url: '/api/v2/posts/hello?id=' + _this.data.pid + '&receiver_id=' + _this.data.broker.id,
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
    },

    callHandle: function(){
      var mobile = this.data.broker.mobile
      if(!mobile){
        return false
      }

      wx.makePhoneCall({
          phoneNumber: mobile 
      })
    },

    bookingHandle: function (e) {
        var _this = this
        auth.ensureUser(function(user){
            // 去绑定用户手机号
            if(!user.mobile){
                app.bindPhoneNumber(e, function(mobile){
                    _this._bookingHandle()
                })
            }else{
                _this._bookingHandle()
            }
        })
    },

    _bookingHandle: function () {
      var pid = this.data.pid
      var _this = this
      var location = wx.getStorageSync('location')
      if (_this.data.bookingStatus) {
        return false
      }

      app.request({
        url: '/api/v1/users/mark_book',
        method: 'POST',
        data: { post_id: pid , location: location},
        success: function (resp) {
          if(resp.data.status == 0){
            wx.showModal({
              title: '预约成功！',
              content: '经济人稍后会来电与您确认具体看房时间，请留意',
            })
            _this.setData({booking: true})
            _this.triggerEvent('booked', {})
          }
        }
      })
    },  
  }
})
