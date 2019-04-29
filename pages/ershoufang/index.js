// pages/ershoufang/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterFloatStatus: 0,
    page: 1,
    filter: {
      group: 'old',
      kw: '',
    }
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  setFilterFloat: function(v){
    if(v == this.data.filterFloatStatus){
      return false
    }
    this.setData({
      filterFloatStatus: v
    })
  },

  onPageScroll: function(e){
    var t = e.scrollTop
    console.log('scroll', t)
    if(t >= 86){
      this.setFilterFloat(1)
    }else{
      this.setFilterFloat(0)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  filterChange: function (e) {
    var path = '/pages/post/index?group=old'
    this.setData({ filter: e.detail })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.page + 1
    this.setData({page: page})
    console.log('page', page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})