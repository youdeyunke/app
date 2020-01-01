// pages/post/meta.js
var auth = require('../../utils/auth.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      loading: true,
      userInfo: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
      this.loadData(q.id)
  },

  loadData: function(pid){
    var _this = this
    app.request({
      hideLoading: true,
      url: '/api/v1/post_meta/' + pid,
      success: function(resp){
        var post = resp.data.data
        _this.setData({loading: false, post: post})
      },
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
      this.setData({userInfo: app.globalData.userInfo})
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
