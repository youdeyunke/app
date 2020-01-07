// pages/qa/new.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  gohome: function(e){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  inputHandle: function (e) {
    var v = e.detail.value
    this.setData({ questionContent: v })
  },


  resetHandle: function(){
    wx.navigateBack({ delta: -1 })
  },

  submitHandle: function () {
    var _this = this
    var content = _this.data.questionContent
    var qLen = typeof content == 'undefined' ? 0 :  content.length 
    var qMinLength = 10

    if (qLen >= 200) {
      wx.showToast({
        title: '文本太长',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (qLen <= qMinLength) {
      wx.showToast({
        title: '请至少填写' + qMinLength + '个字符',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    auth.ensureUser(function(userInfo){
        _this.doSubmit()
    })
  },

  doSubmit: function () {
    var _this = this
    var content = _this.data.questionContent
    app.request({
      method: 'POST',
      url: '/api/v1/questions/',
      data: { content: content, target_id: _this.data.target_id, target_type: _this.data.target_type},
      success: function (resp) {
        // redirect
        wx.navigateBack({ delta: -1 })
        wx.showToast({
          title: '问题提交成功，我们会尽快回复您',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({target_id: q.target_id, target_type: q.target_type || 'post'})
    var _this = this
    auth.ensureUser(function(userInfo){
        _this.setData({userInfo: userInfo})
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
