// components/broker.js
const app = getApp()
var auth = require('../../utils/auth.js');

Component({
  options: { }, 
  /**
   * 组件的属性列表
   */

  properties: {
    post: {type: Object, value: null},
    broker: {type: Object, value:null},
    pid: {type: Number, value: null},
    bookingStatus: {type: Boolean, value: false},
  },

  /**
   * 组件的初始数据
   */
  data: {
      ext: wx.getExtConfigSync(),
      favStatus: 0,
      favCount: 0,
      btn2Text: '拨打电话',
      btn2Action: 'call',
  },

  ready: function(){
    var _this = this
    if(this.data.ext.fenxiao_enable && this.data.post.group == 'new'){
        var t = '报备客户'
        var a = 'report'
    }else{
        var t = '拨打电话'
        var a = 'call'
    }
    this.setData({
        btn2Text: t,
        btn2Action: a,
    })

    this.loadFavStatus()
  },


  /**
   * 组件的方法列表
   */
  methods: {
    
    posterHandle: function(){
        wx.navigateTo({url: '/pages/poster/index?id=' + this.data.pid } )
    },

    reportHandle: function(){
        wx.navigateTo({url: '/pages/fenxiao/report?pid=' + this.data.pid } )
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

    reportHandle: function(){
        var pid = this.data.pid
        wx.navigateTo({
            url: '/pages/fenxiao/report?pid=' + pid ,
        })
    },

    callHandle: function(){
      var m = this.data.broker.mobile
      wx.makePhoneCall({
        phoneNumber: m,
      })
    },

    btn2Handle: function(){
        if(this.data.btn2Action == 'call'){
            this.callHandle()
        }else{
            this.reportHandle()
        }
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
            wx.navigateTo({
              url: '/pages/messages/show?target_user_id=' + _this.data.broker.id ,
            })
          }
        },
        complete: function(){
          wx.hideLoading()
        },
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
                _this.selectComponent('#booking').openHandle()
            }
        })
    },

     bookingChange: function(e){
         console.log('booking change', e)
         var post = this.data.post
         post.user_has_booking = true
         this.setData({post: post})
     },

  }
})
