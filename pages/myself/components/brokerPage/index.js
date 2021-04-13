// pages/myself/images/components/brokerPage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user:{
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
    gologin:function(){
      wx.navigateTo({
        url: '/pkgAuth/pages/auth/index',
      })
    },
    myquit: function (e) {
      this.setData({
        userinfo: e.detail
      })
      this.triggerEvent("changeQuit", {
        userinfo: null
      })
    }
  }
})
