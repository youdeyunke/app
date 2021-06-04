// components/message/brokers_info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userinfo:{
      type:Object
    }
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
    callHandle(){
      var mobile = this.properties.userinfo.mobile
      wx.makePhoneCall({
        phoneNumber: mobile,
      })
    },
    copyHandle(){
      var wechat = this.properties.userinfo.wechat
      if(wechat==null){
        wx.showToast({
          title: '该经纪人还没有上传微信号',
          icon:'none'
        })
      }
      wx.setClipboardData({
        data: wechat,
        success(){
          wx.showToast({
            title: '微信号已复制',
            icon:'success',
            duration:1000
          })
        }
      })
    }
  }
})
