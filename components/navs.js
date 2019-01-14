// components/home-navs.js
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
  data: {
    navs: wx.getStorageSync('navs'),
  },

  ready: function(){
    var _this = this
    _this.loadData((navs) => {
      _this.setData({navs: navs})
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData: function(cb){
      app.request({
        url: '/api/v2/navs',
        success: function(resp){
          var navs = resp.data.data
          wx.setStorage({key: 'navs', data: navs})
          return cb(navs)
        }
      })
    },

    publishClose: function(e){
      this.setData({
        publishSheetShow: false
      })
    },

    publishClick: function(e){
      this.publishClose()
      var group = e.detail.group
      var url =  '/pages/post/form?group=' 
      url += e.detail.group 
      url +=  '&rent_type=' 
      url += e.detail.rent_type || 'zhengzu'
      url += '&is_sublet='
      url += e.detail.is_sublet || 'false'
      wx.navigateTo({
        url: url,
      })
    },

    publishHandle: function(e){
      // 点击发布按钮，弹出选择框
      this.setData({
        publishSheetShow: true,
      })
    },

  }
})
