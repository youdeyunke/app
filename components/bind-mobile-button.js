// components/bind-mobile-button.js
const app = getApp()
const userApi= require("../api/user")


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size: {type:String, value: 'small'},
    type: {type: String, value: 'primary'},
    btnText: { type: String, value: '授权'},

  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber: function (e) {
      var _this = this

      if (!e.detail.iv) {
        return false
      }

      if (this.data.mobile) {
        return false
      }

      wx.showLoading({
        title: '处理中',
        mask: true
      })

      var token = wx.getStorageSync('token')
      var that = this
//  有待检测
      userApi.bindXcxMobile(e.detail.iv,e.detail.encryptedData).then((res)=>{
        if (res.data.status != 0) {
            wx.showModal({
              content: '服务器出现错误，请稍后再试',
              showCancle: false
            })
          } else {
            // 绑定手机号成功
            that.setData({ userInfo: res.data.data   })
            wx.setStorageSync('userInfo', res.data.data)
            _this.triggerEvent('change', res.data.data.mobile)

          }
      })
    },

  }
})
