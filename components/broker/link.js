// components/broker-link.js
const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    broker: {type: Object, value: {}},
    postId: {type: Number, value: null}
  },

  /**
   * 组件的初始数据
   */
  data: {
      chatEnable: true,

  },

  ready: function(){
     var chatEnable = app.globalData.EXT['chat_enable'] != false
     this.setData({ chatEnable: chatEnable})
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chatHandle: function(){
      // 先调用打招呼接口
      wx.showLoading({title: '正在打开', icon: 'none', mask: true})
      var _this = this
      if(!this.data.postId){
        wx.navigateTo({
          url: '/pages/messages/show?target_user_id=' + _this.data.broker.id ,
          success: function(){
            wx.hideLoading()
          }
        })
        return
      }

      var data = {receiver_id: this.data.broker.id, id: this.data.postId || ''}
      app.request({
        url: '/api/v2/posts/hello',
        data: data,
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

    callHandle: function(){
      var mobile = this.data.broker.mobile
      if(!mobile){
        return false
      }

      wx.makePhoneCall({
          phoneNumber: mobile 
      })
    },

    gotoUser: function(e){
      var _this = this
      var url = '/pages/user/user?id=' + this.data.broker.id
      wx.navigateTo({
        url: url,
      })
    }

  }
})
