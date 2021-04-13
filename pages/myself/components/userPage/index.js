// pages/myself/images/components/userPage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userinfo: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigatetTo: function (e) {
      console.log('e', e)
      var url = e.currentTarget.dataset.url
      console.log("url", url);
      wx.navigateTo({
        url: url,
      })
    },
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
  },

})