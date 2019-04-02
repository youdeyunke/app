// pages/sub-districts/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    filter: {},
    page: 1,
    filterConfigs: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */                                                                                                 
  onLoad: function (q) {
    var data = {}
    var filter = q || {}
    data['filter'] = filter
    if(q.kw || q.text){
      data['kw'] = q.kw || q.text
    }
    this.setData(data)
  },

  inputChange: function (e) {
    var kw = e.detail
    if (kw.length >= 1) {
      console.log('input', kw)
      this.setData({ kw: kw })
    }
  },  

  inputClear: function(e){
    this.setData({kw: ''})
  },


  filterChange: function(e){
    this.setData({filter: e.detail})
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
    var page = this.data.page || 1
    this.setData({
      page : page + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
