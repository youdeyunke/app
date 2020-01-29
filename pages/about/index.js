// pages/about/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    debugClickCounter: 0,
    info: {},
  },

  copyWechat: function(){
    var _this = this
    wx.setClipboardData({
      data: _this.data.wechat,
      success: function(){
        wx.showToast({
          title: '已复制',
        })        
      }
    })

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
  onLoad: function (q) {
    var _this = this
    app.request({
      url: '/api/v1/myconfigs',
      success: function(resp){
        _this.setData({info: resp.data.data})
      }
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
