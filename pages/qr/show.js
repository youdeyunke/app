// pages/qr/show.js
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qid: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    wx.showLoading({
      title: '正在解析二维码，请稍后',
    })

    this.loadData(q.id)

  },

  loadData: function(qid){
    var _this = this   
    app.request({
      url: '/api/v1/qrs/' + qid,  
      hideLoaindg: true, 
      success: function(resp){
        if(resp.data.status != 0){
          return 
        }
        var qr = resp.data.data 
        // 跳转到页面 
        app.globalData.qrdata = qr.data  
        console.log('response ', qr)
        wx.redirectTo({
          url: qr.path,
        })
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