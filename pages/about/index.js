// pages/about/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    debugClickCounter: 0,
    serverMobile: app.globalData.serverMobile
  },

  debugHandle :function(e){
    this.setData({ debugClickCounter: this.data.debugClickCounter + 1})
    if (this.data.debugClickCounter % 10 == 0){
      wx.navigateTo({
        url: '/pages/home/debug',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var today = new Date();  //开始时间
    var lastDay = new Date('2018/04/01');    //结束时间
    var delta = lastDay.getTime() - today.getTime()
    console.log('delta', delta)
    if(delta <= 0){
      _this.setData({ showInfo: true })
    }else{
      var days = Math.floor(delta / (24 * 3600 * 1000))
      console.log('days ', days)
    }

    
  
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