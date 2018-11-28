// pages/messages/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: null,
    polling: false,
    sleepTime: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  loadData: function(){
    var _this = this
    console.log('load data')
    app.request({
      url: '/api/v1/chat_lists/',
      hideLoading: true,
      success: function (res) {
        if (res.data.status == 0) {
          _this.setData({ items: res.data.data, sleepTime: res.data.sleep })
        }
      },
      complete: function(res){
        console.log('settimeout ', _this.data.sleepTime)
        if(_this.data.polling){
          setTimeout(_this.loadData, _this.data.sleepTime)
        }
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
    this.setData({polling: true})
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ polling: false })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({polling: false})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadData()
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