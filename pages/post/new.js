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

  submit:function(e){
    console.log('submit e', e)
  },
  
  inputChanged: function(e){
    console.log('input change', e)
  },

  showTypePicker: function(){
    this.selectComponent('#typepicker').onShow()
  },

  showPayment: function(){
    this.selectComponent('#payment').onShow()
  },

  paymentChanged: function(e){
    var post = this.data.post
    post.payment_cycle = e.detail.payment_cycle
    this.setData({post : post })
  },

  typeChanged: function(e){
    var post = this.data.post
    post.s = e.detail.s
    post.t = e.detail.t
    post.w = e.detail.w
    post.position = e.detail.position
    this.setData({post : post })
  },

  floorChanged: function(e){
    console.log('333333',e)
    var post = this.data.post
    post.current_floor = e.detail.current_floor
    post.total_floor = e.detail.total_floor
    console.log('changed', e, post)
    this.setData({post : post })
  },

  showFloorPicker: function(){
    this.selectComponent('#floorpicker').onShow()
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
