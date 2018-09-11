// pages/myself/myself.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  getPhoneNumber: function (e) {
    wx.showToast({title: '演示项目无法绑定'})

    if(!e.detail.iv){
        this.setData({mobile: ' '}) 
        return false
    }

    if(this.data.mobile){
        return false
    }

    wx.showLoading({title:'处理中', mask: true})  
    var token = wx.getStorageSync('token')
    var that = this
    app.request({
      method: 'POST',
      url: '/api/v1/users/bind_xcx_mobile',
      data:  {'iv': e.detail.iv, 'encryptedData': e.detail.encryptedData}, 

      success: function(res){
        if(res.data.status != 0){
           wx.showModal({content:'服务器出现错误，请稍后再试', showCancle: false})
        }else{
          // 绑定手机号成功
          that.setData({userInfo: res.data.data})
          wx.setStorageSync('userInfo', res.data.data)
          console.log(that.data.mobile)
          wx.showToast({
            title: '绑定手机号成功',
          })
          app.loginBack()
        }
      }
    })
  },


  loginHandle: function(e){
    auth.loginHandle(this, e)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(this.data.userInfo)
  
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
