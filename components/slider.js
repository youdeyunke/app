// components/slider.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {

    gotoAbout: function(e){
      wx.navigateTo({
        url: '/pages/static/about',
      })
    },

    gotoQa: function(e){
      wx.navigateTo({
        url: '/pages/qa/index',
      })
    },

    gotoTiao: function(e){
      console.log('e')
      wx.switchTab({
        url: '/pages/tiao/index',
      })
    },

    gotoPost: function(e){
      wx.navigateTo({
        url: '/pages/post/index',
      })
    },

    gotoVideo: function(e){
      console.log('e', e)
      app.getUserInfo(function(userInfo){
        if(userInfo && !userInfo.mobile){
          // 前往登录，并设置登录成功后回调页面
          wx.setStorageSync('login_back_navigate_to_video',true)
          app.gotoAccount("请先登录", "请先登录")               
        }else{
          app.navigateToVideo()
        }
      })


      

    },

    soon: function(e){
      app.comingSoon()
    }

  }
})
