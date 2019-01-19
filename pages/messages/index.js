// pages/messages/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: null,
    sleepTime: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
    this.startInterval()
  },

  startInterval: function(){
    // 开启定时器，并防止重复
    var _this = this
    var key = 'message.index.interval.id'
    var t =  15000
    var iid = wx.getStorageSync(key)
    if(iid){
      clearInterval(iid)
    }

    var iid = setInterval(_this.loadData, t)
    wx.setStorageSync(key, iid)
    console.log('开启定时器，刷新聊天列表', t)
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
