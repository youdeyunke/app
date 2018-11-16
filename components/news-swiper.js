// components/news-swiper.js
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
    items: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadData: function(){
      var _this = this
      app.request({
        url: '/api/v1/news',
        data:{ limit:10 },
        success: function(resp){
          _this.setData({items: resp.data.data})
        },
      })
    },

  }
})
