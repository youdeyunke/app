// components/news-swiper.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {type: Array, value: []},
    limit: {type: Number, value: 3},
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
        itemClick: function (e) {
            var _this = this
            var index = e.currentTarget.dataset.index
            var item = this.data.items[index]
            var url = item.url
            var path = '/pkgNews/pages/news/show?id=' + item.id
            // 判断是打开webview，还是显示自定义内容
            if (url) {
                console.log('goto webview', url)
                app.gotoWebview(url, item.title)
                return false
            }
            wx.navigateTo({ url: path, })

        },


  }
})
