// pkgBroker/pages/broker/audit/index.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  submitHandle:function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  onLoad: function (options) {
    var item = options
    this.setData({
      state:item.status
    })

  },

  gotoHomepage: function(){
    var user = app.globalData.userInfo 
    var url = '/pkgBroker/pages/broker/profile?id=' + user.id  
    wx.redirectTo({
      url: url,
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