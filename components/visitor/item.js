// components/cell/cell.js
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

  },
  /**
   * 组件的方法列表
   */
  methods: {
    phoneCall(){
      let phone = this.properties.item.user.mobile
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    }
  },
})
