// pages/post/coupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  markBooking: function(post_id){
    var _this = this
    app.request({
      url: '/api/v1/users/mark_book', 
      method: 'POST',
      data: {
        post_id: post_id
      },
      success: function(resp){
        console.log('resp', resp)
      }
    })
  },

  gobackHandle: function(e){
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    var _this = this
    app.ensureMobile("/pages/post/booking?post_id=" + q.post_id, function (userInfo) {
      _this.setData({ showCoupon: true })
      _this.markBooking(q.post_id)
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