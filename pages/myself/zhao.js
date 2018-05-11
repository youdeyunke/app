// pages/myself/zhao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    purposeList: [
      { name: '刚需'},
      { name: '结婚'},
      {name: '投资'},
      {name: '给父母住'},
      {name: '孩子上学'},
      {name: '改善条件'},
      {name: '其他'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  purposeHandle: function(e){
    var i = e.currentTarget.dataset.index
    var ps = this.data.purposeList
    var p = ps[i]
    p.selected = !p.selected
    ps[i] = p 
    this.setData({ purposeList:ps })
  },

  rangeChange: function(e){
    console.log('range change', e.detail.range)
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