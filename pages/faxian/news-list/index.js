// pages/faxian/news/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    kw:{
      type:String
    },
    page:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topNewsItems:[],
    newsItems: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadNewsCats: function () {
      //查询顶部
      var _this = this
      app.request({
        url: '/api/v1/news_cats',
        success: function (resp) {
          _this.setData({
            newsCats: resp.data.data
          })
        }
      })
    },
    loadTopNews: function () {
      // 热门推荐
      var query = {
        is_top: true,
        per_page: 30
      }
      var _this = this
      app.request({
        url: '/api/v1/news',
        data: query,
        success: function (resp) {
          if (resp.data.status != 0) {
            return
          }
          var items = resp.data.data
          _this.setData({
            topNewsItems: items,
            loading: false
          })
        }
      })
    },
    loadNews: function () {
      //楼盘资讯
      var _this = this
      var query = {
          page: this.properties.page,
          is_top: false,
          kw:this.properties.kw,
      }
      app.request({
          url: '/api/v1/news',
          data: query,
          success: function (resp) {
              if (resp.data.status != 0) {
                  return
              }
              var items = resp.data.data
              _this.setData({ newsItems: items, loading: false })
              console.log("楼盘资讯数据："+_this.data.newsItems)

              if (items.length == 0 && query.page === 1) {
                  wx.showToast({
                      title: '没有数据',
                      icon: 'none',
                  })
              }
          }
      })
    },
  },
  ready: function () {
    this.loadNewsCats()
    this.loadTopNews()
    this.loadNews()
  },
  observers:{
    'kw':function(){
      this.loadNews()
    }
  }

})