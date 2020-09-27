// components/owner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{type: Object, value: null}
  },
  /**
   * 组件的初始数据
   */
  data: {
    whiteSpace:'nowrap'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change:function(){
      var wrap = this.data.whiteSpace == 'wrap'? 'nowrap' :'wrap' 
      this.setData({
        whiteSpace:wrap
      })
    },
    phoneCall(){
      let phone = this.properties.item.mobile
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    }
  }
})
