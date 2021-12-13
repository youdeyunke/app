const auth = require("../../utils/auth")
// components/login-window/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  ready: function () {
    this.setData({
      bg: app.globalData.myconfigs.ui.login_window || 'https://qiniucdn.udeve.net/fang/login-window.png',
      primaryColor: app.globalData.myconfigs.color.primary || '#1989fa',
      primaryBtnColor: app.globalData.myconfigs.color.primary_btn || 'linear-gradient(270deg, #1989FA 0%, rgba(25, 137, 250, 0.6) 100%)',
    })
    var _this = this
    wx.login({
      success: function (res) {
        _this.setData({
          code: res.code
        })
      },
      complete: function (res) {
        // 用户拒绝,跳转到设置界面
        if (res.errMsg == 'getUserInfo:fail auth deny') {
          wx.openSetting({})
        }
      }
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
    show: false,
    bg: null,
    primaryColor: '#1989fa',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoSms: function () {
      if (this.data.loading) {
        return
      }
      wx.navigateTo({
       url: '/pkgAuth/pages/auth/sms'
      })
    },
    loginHandle: function (e) {
      this.setData({
        loading: true
      })
      // 防止一直转圈 
      var _this = this
      setTimeout(() => {
        _this.setData({
          loading: false
        })
      }, 5000)

      var code = this.data.code
      auth.loginHandle(code, e, (user) => {
        this.triggerEvent('success', user)
        this.closeWindow()

      })
    },

    closeWindow: function () {
      this.setData({
        show: false,
        loading: false,
      })
    },



    openWindow: function () {
      if (this.data.show == true) {
        return false
      }
      this.setData({
        show: true,
        loading: false,
      })
    },

  }
})