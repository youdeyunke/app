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
      navPages: wx.getStorageSync('navPages'),
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
          var navPages = []
          var index = 0
          var pageSize = 10
          for(var i=0;i<=navs.length -1;i++){
            var nav = navs[i]
            if (!nav.path.startsWith('/')) {
              nav.path = '/' + nav.path
            }

            if(navPages[index] && navPages[index].length == pageSize){
                // 满了
                index += 1
            }

            // 将navs 转换成可翻页的格式
            if(typeof navPages[index] == 'undefined'){
                navPages[index] = [nav]
            }else{
              navPages[index].push(nav)
            }
            
          }

          console.log('navpages ', navPages)



          wx.setStorage({key: 'navPages', data: navPages})
          _this.setData({navPages: navPages})

          typeof cb == 'function' && cb(navs)
        }
      })
    }
  }
})
