// pages/post/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [],
    cid: null,
    city_id: null,
    offset: 0,
    total: 0,
    limit: 10,
    hasMore: true,
    posts: [],
  },


  onLoad: function (query) {
    var cid =  query.cid
    var _this = this
    app.loadPosts(_this)
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
