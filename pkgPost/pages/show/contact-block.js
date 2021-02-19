// components/post/contact.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {type: Object},
  },

  ready: function(){
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
    callMe: function(){
      var _this = this
      wx.makePhoneCall({
          phoneNumber: _this.data.value.mobile 
      })
    },
  }
})
