// pages/school-region/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {name: '查学区', plh: '输入小区关键词'},
      {name: '查学校', plh: '输入学校关键词'},
    ],
    kw: '',
    activeTabIndex: 0,
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

  tabHandle: function(e){
    var i = e.target.dataset.index  
    if(i == this.data.activeTabIndex){
      return false
    }
    this.setData({activeTabIndex: i})
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
