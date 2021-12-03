// pages/auth/sms.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allowTerms: false, 
    ui: {},
    alowTerms: true, // 是否接受用户协议
    phone: "",
    yanzheng: "",
    time: 60,
    yanzhengShow: false, // 控制验证码发送按钮的状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    app.ensureConfigs(function (configs) {
      _this.setData({
        ui: configs.ui
      })
    })


  },

  toggleShow() {
    var show = this.data.alowTerms
    if (!show) {
      show = true
    } else {
      show = false
    }
    this.setData({
      alowTerms: show
    })
  },
  sendYanzheng() {
    var _this = this
    var phone = this.data.phone
    if (!phone) {
      wx.showModal({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showModal({
        title: '手机号格式错误',
        icon: 'none'
      })
      return false
    }
    app.request({
      url: '/api/v1/sms',
      method: 'POST',
      data: {
        mobile: _this.data.phone
      },
      success: function (res) {
        wx.showToast({
          title: '发送成功'
        })
        _this.setData({
          yanzhengShow: true
        })
        _this.Timeout()
      }
    })
  },
  Timeout() {
    var _this = this
    var time = this.data.time - 1
    setTimeout(() => {
      _this.setData({
        time: time
      })
      if (this.data.time <= 0) {
        this.setData({
          time: 60,
          yanzhengShow: false
        })
        return
      } else {
        this.Timeout()
      }
    }, 1000);
  },


  termsHandle: function () {
    this.setData({
      allowTerms: !this.data.allowTerms,
    })
  },


  loginHandle() {
    var phone = this.data.phone
    var yanzheng = this.data.yanzheng
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showModal({
        title: '手机号格式错误',
        icon: 'none'
      })
      return false
    }
    if (yanzheng.length != 4) {
      wx.showModal({
        title: '验证码输入错误',
        icon: 'none'
      })
      return false
    }
    app.request({
      url: '/api/v1/sms/auth',
      method: 'POST',
      data: {
        mobile: phone,
        code: yanzheng
      },
      success: function (res) {
        var data = res.data
        if (data.status == 0) {
          // 保存下服务器返回的token
          var token = data.data.token
          var user = data.data.user
          wx.setStorageSync('token', token)
          wx.setStorageSync('userInfo', user)
          // 在globalData中标记登录状态
          app.globalData.token = token
          app.globalData.userInfo = user
          wx.switchTab({
            url: '/pages/myself/index'
          })
        }

      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})