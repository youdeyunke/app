// pages/post/new.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cities: [],
    districts: [],
    post: {
      city: {},
      district: {},
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCityList()
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

  showCityPicker: function(){
    this.selectComponent('#citypicker').onShow()
  },

  cityChanged: function(e){
    var post = this.data.post
    post.city = e.detail.city
    post.district = e.detail.district
    this.setData({post : post })
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
