// components/sub-district/hot-subdistricts.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number, value: 5, observer: "loadData"
    }
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
    loadData: function () {
      var _this = this
      app.request({
        url: '/api/v1/sub_districts/hot',
        data: {
          count: _this.data.count
        },
        success: function (resp) {
          _this.setData({
            items: resp.data.data
          })
        }
      })
    },    

  }
})
