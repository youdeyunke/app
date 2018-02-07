// pages/myself/myself.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    loadingStatus : null,
    debugClicks: 0
  },

  debugHandle: function(e){
    console.log('debugpage_click_count ', this.data.debugClicks)
  
    this.data.debugClicks += 1
    if (this.data.debugClicks % 20 == 0) {
      wx.navigateTo({ url: '/pages/home/debug' })
    }
  },

  loginTapHandle: function(){
    var _this = this
    app.globalData.loadingStatus += 1
    console.log('abc')
    app.getUserInfo(function(userInfo){
      _this.setData({userInfo: userInfo})
    })
  },

  bindMobileHandle: function(e){
    console.log(e.detail.errMsg) 
    console.log(e.detail.iv) 
    console.log(e.detail.encryptedData) 
    var _this  = this
    app.request({
      url: '/api/v1/users/bind_xcx_mobile',
      method: 'POST',
      data: { iv: e.detail.iv, encryptedData: e.detail.encryptedData },
      success: function(resp){
        _this.setData({userInfo: resp.data.data})
        wx.setStorageSync('userInfo', resp.data.data)
        wx.showToast({
            title: '绑定手机号成功',
            icon: 'success',
            duration: 2000
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      loadingStatus : app.globalData.loadingStatus
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
