// pages/myself/myself.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
      code: null,
    },


  loginHandle: function(e){
    console.log('uinfo', e)
    var _this = this
    // 注意，code 需要在getUserInfo之前获取到，否则会导致登录失败
    var code = _this.data.code
    if (e.detail.errMsg != 'getUserInfo:ok'){
      console.error('授权时候出错', e)
      return
    }

    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
  
    wx.login({
      success: function(res){
          // 换取服务器的token
          _this.getSessionToken(code, encryptedData, iv, function(userInfo){
            // success
            wx.navigateBack({delta: 1})
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


  getSessionToken: function (code, encryptedData, iv, cb) {
    // 重新获取token，并刷新 user info
    var _this = this

    // 发送给服务器
    app.request({
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },

      method: 'POST',
      url: '/api/v1/sessions',
      success: function (resp) {
        var data = resp.data
        if (data.status == 0) {
          console.log('server response ', resp)

          // 保存下服务器返回的token
          wx.setStorageSync('token', data.data.token)
          wx.setStorageSync('userInfo', data.data.user)
          app.globalData.loginFlag = 1
          // callback
          typeof cb == "function" && cb(data.data.user)
        }
      }
    })
  },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var _this = this
      wx.login({
        success: function(res){
          _this.setData({code: res.code})
        }
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
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
