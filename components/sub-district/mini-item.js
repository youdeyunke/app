// components/sub-district/mini-item.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sid: {
      type: Number, value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    item: {},
  },

  ready: function(e){
    var _this = this
    app.request({
      url: '/api/v1/sub_districts/' + _this.data.sid,
      success: function(resp){
        _this.setData({item: resp.data.data})
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
