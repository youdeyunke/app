// components/slider.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      items: {type:Array, value: []},

  },

  ready: function(){
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
    gotoSearch: function(e){
      wx.navigateTo({
        url: '/pages/search/index'
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

  }
})
