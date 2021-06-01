// pages/faxian/hd/index.js
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
    tourItems: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadTours: function () {
      var _this = this
      var query = {
        kw:this.properties.kw,
        page:this.properties.page,
      }
      app.request({
        url: '/api/v1/tours/',
        data: query,
        success: function (resp) {
          if (resp.data.status != 0) {
            return
          }
          if(this.data.page==1){
            _this.setData({
              tourItems:resp.data.data
            })
          }else if(this.data.page>1){
            var oldData = _this.data.tourItems
            var newData = resp.data.data
            var Data = oldData.concat(newData)
            _this.setData({
              tourItems:Data
            })
          }
          if (_this.data.tourItems.length == 0 && query.page === 1) {
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
    this.loadTours()
  },
  observers:{
    'kw':function(){
      this.loadTours()
    },
    'page':function(){
      this.loadTours()
      console.log("dhiiiiii")
    },
  }
})