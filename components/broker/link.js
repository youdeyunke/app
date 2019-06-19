// components/broker-link.js
Component({
  options: {
    addGlobalClass: true
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    broker: {type: Object, value: {}}
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
    gotoUser: function(e){
      var _this = this
      var url = '/pages/user/user?id=' + this.data.broker.id
      wx.navigateTo({
        url: url,
      })
    }

  }
})
