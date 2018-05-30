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

    soon: function(e){
      app.comingSoon()
    }

  }
})
