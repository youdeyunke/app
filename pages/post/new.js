// pages/post/new.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
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

  nextStep: function(e){
    this.setData({step: 2})
  },

  previousStep: function(e){
    this.setData({step: 1})
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

  showFitmentPicker: function(){
    this.selectComponent('#fitmentpicker').onShow()
  },

  paymentChanged: function(e){
    this.updatePostField('payment_cycle', e.detail.payment_cycle)
  },

  fitmentChanged: function(e){
    this.updatePostField('fitment', e.detail.fitment)
    this.updatePostField('fitment_id', e.detail.fitment.id)
  },

  typeChanged: function(e){
    console.log('aaa')
    var post = this.data.post
    post.s = e.detail.s
    post.t = e.detail.t
    post.w = e.detail.w
    post.position = e.detail.position
    this.setData({post : post })
  },

  floorChanged: function(e){
    this.updatePostField('current_floor', e.detail.current_floor)
    this.updatePostField('total_floor', e.detail.total_floor)
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

  imagesChanged: function(e){
    console.log('images change', e)
    var keys = Object.keys(e.detail)
    if(keys.includes('images')){
      this.updatePostField('images', e.detail.images)
    }
    if(keys.includes('cover_index')){
      this.updatePostField('cover_index', e.detail.cover_index)
    }
  },


  updatePostField: function(key, value){
    var post = this.data.post
    post[key] = value
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
