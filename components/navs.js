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
      for(var i=0;i<=navs.length -1;i++){
        var nav = navs[i]

        if (!nav.path.startsWith('/')) {
          nav.path = '/' + nav.path
        }
        navs[i] = nav
      }
      _this.setData({navs: navs})
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData: function(cb){
        var _this = this
      app.request({
        url: '/api/v2/navs',
        hideLoading: true,
        success: function(resp){
          var navs = resp.data.data
          for(var i=0;i<=navs.length -1;i++){
            var nav = navs[i]
            if (!nav.path.startsWith('/')) {
              nav.path = '/' + nav.path
            }
            navs[i] = nav
          }
          wx.setStorage({key: 'navs', data: navs})
          _this.setData({navs: navs})

          typeof cb == 'function' && cb(navs)
        }
      })
    }
  }
})
