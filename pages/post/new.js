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

  cityChange: function(e){
    var val = e.detail.value
    var cityIndex = val[0]
    var districtIndex= val[1]

  },


  loadDistrictList: function(){
    var _this = this
    app.request({
      url: '/api/v1/districts/',
      data: {},
      hideLoading: true,
      success: function(resp){
        _this.setData({districts: resp.data.data})
      }
    })
  },


  loadCityList: function(){
    var _this = this
    app.request({
      url: "/api/v1/cities/",
      data: {},
      hideLoading: true,
      success: function(resp){
          _this.setData({cities: resp.data.data})
          _this.loadDistrictList(resp.data.data[0].id)
      },
    })

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
