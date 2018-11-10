// components/slider.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  ready: function(){
    this.loadData()
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: wx.getStorageSync('banners'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    comming: function(e){
      wx.showModal({
        title: '温馨提示',
        content: '功能正在开发中，即将上线，敬请期待!',
      })
    },

    goto: function(e){
      var i = e.currentTarget.dataset.index
      var item = this.data.items[i]
      switch(item.opentype){
        case 'navigateTo':
          wx.navigateTo({url: item.path})
          break
        case 'switchTab':
          wx.switchTab({url: item.path})
          break
      }
    },
    loadData: function(e){
      var _this = this
      app.request({
        url: '/api/v1/banners',
        success: function(resp){
          wx.setStorage({
            key: 'banners',
            data: resp.data.data,
          })
          _this.setData({items: resp.data.data})
        }
      })
    },

    soon: function(e){
      app.comingSoon()
    }

  }
})
