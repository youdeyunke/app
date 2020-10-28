// pages/faxian/hot-news.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    limit: {type: Number, default: 5}
  },

  ready: function(){
      this.loadData()
  },
  /**
   * 组件的初始数据
   */
  data: {
    items: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

    gotoDetail: function(e){
      console.log('e', e)
      const {  index  } =  e.currentTarget.dataset 
      var item = this.data.items[index]
      var path = '/pkgNews/pages/news/show?id=' + item.id  
      wx.navigateTo({
        url: path,
      })
    },

    loadData: function(){
      var _this = this  
      var query = {
        per_page: _this.data.limit , 
        page: 1, 
        is_top: true,
      }
      app.request({
        url: '/api/v1/news', 
        data: query  , 
        success: function(resp){
          if(resp.data.status != 0){
            return false 
          }
          _this.setData({
            items: resp.data.data
          })
        }
      })
    }

  }
})
