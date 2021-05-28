// pages/faxian/qa/index.js
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
    qaItems: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadQas: function () {
      var _this = this
      var query = {
        kw:this.properties.kw,
        page:this.properties.page
      }
      app.request({
        url: '/api/v1/questions/',
        data: query,
        success: function (resp) {
          if (resp.data.status != 0) {
            return
          }
          var items = resp.data.data
          _this.setData({
            qaItems: items,
            loading: false
          })
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
  ready:function(){
    this.loadQas()
  },
  observers:{
    'kw':function(){
      this.loadQas()
    }
  }
})