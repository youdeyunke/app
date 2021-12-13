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

  ready: function(){
    this.loadQas()
    var color = app.globalData.myconfigs.color
    this.setData({ 
        primaryBtnColor: color.primary_btn, 
        secondaryBtnColor: color.secondary_btn,
    })
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
          if(query.page==1){
            _this.setData({
              qaItems:resp.data.data
            })
          }else if(query.page>1){
            var oldData = _this.data.qaItems
            var newData = resp.data.data
            var Data = oldData.concat(newData)
            _this.setData({
              qaItems:Data
            })
          }
          if (_this.data.qaItems.length == 0 && query.page === 1) {
            wx.showToast({
              title: '没有数据',
              icon: 'none',
            })
          }
        }
      })
    },
  },

  observers:{
    'kw':function(){
      this.loadQas()
    },
    'page':function(){
      this.loadQas()
    }
  }
})