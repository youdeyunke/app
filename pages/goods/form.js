// pages/goods/form.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      topic: { },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  updateTopicField: function(key, value){
    var d = {}
    var key = 'topic.' + key
    d[key] = value
    this.setData(d)
  },

  imagesChanged: function(e){
      this.updateTopicField('meta_images', e.detail.images)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  chooseLocation: function (e) {  
    var _this = this  
    wx.chooseLocation({
          success: function (res) { 
              console.log('res', res)
              _this.updateTopicField('address', res.address)
           }
      })
  },

  submitHandle: function (e) {  
      console.log('form data is', e.detail.value)
      var formData = e.detail.value
      var _this = this
      Object.keys(formData).forEach(function (k, i) { 
          var v = formData[k]
          _this.updateTopicField(k, v)
      })
      console.log('topic', this.data.topic)
      this.doSubmit(this.data.topic)
  },

  doSubmit: function (data) { 
      var _this = this
      data['meta_images_is_multi'] = 'true'
      data['test'] = 'true'
      app.request({
          url: '/api/v1/topics',
          method: 'POST',
          data: data,
          success: function(resp) {  
              console.log('resp', resp.data.data)
          }
      })

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