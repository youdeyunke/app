// components/news-swiper.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    limit: {type: Number, value: 3},
  },

  ready: function(){
    this.loadData()
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadData: function(){
      var _this = this
      app.request({
        url: '/api/v1/news',
        data:{ limit: _this.data.limit || 5 },
        success: function(resp){
          if(resp.data.data.length > 0){
            _this.setData({items: resp.data.data})
          }else{
            _this.setData({items: [
              {title: '请先在管理后台添加头条文章'}
            ]
            })
          }
        },
      })
    },

  }
})
