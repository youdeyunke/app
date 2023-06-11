// pages/cities/select.js
const app = getApp()
const cityApi= require("../../api/city")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  loadData(){
      var _this = this
    //   有待检测
    //   var url = '/api/v1/cities/有待检测'
    //   app.request({
    //       url: url,
    //       success(resp){
           
    //       }
    //   })
      cityApi.getCityListV1(

      ).then((resp)=>{
        _this.setData({
            cities: resp.data.data
        })
      })
  },

  citySelect(e){
    console.log(e.currentTarget.dataset.adcode)
    var adcode = e.currentTarget.dataset.adcode
    wx.setStorageSync('cityCode', adcode)
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
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