// pages/fenxiao/balance.js
const app = getApp()
const bookingApi = require("../../../api/booking")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page: 1,
      items: [],
      per_page: 40,
      loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadData()
  },


  loadData: function(){
      this.setData({loading: true})
      var _this  = this
      var query = {
          page: _this.data.page,
          user_group: 'broker',
          per_page: _this.data.per_page,
      }
    //   有待检测
    //   app.request({
    //       url: '/api/v1/booking_logs/有待检测',
    //       data: query,
    //       success: function(resp){
           
    //       },
    //   })
      bookingApi.getBookingList(
        query
      ).then((resp)=>{
        var i = query['page']  - 1
        var data = { loading: false }
        if ( i > 0) {
          var key = 'items[' + i + ']'
          data[key] = resp.data.data
        } else {
          data['items'] = [resp.data.data]
        }
        _this.setData(data)
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
      this.setData({page: 1, items: []})
      this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var page = this.data.page
      this.setData({page: page + 1})
      this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
