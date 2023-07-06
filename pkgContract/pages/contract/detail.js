// pkgContract/pages/contract/detail.js
var contractApi = require("../../../api/contract")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    title: "",
    Contract:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    this.getdata()
  },
  getdata: function () {
    var _this = this
    contractApi.getContractDetail(this.data.id).then((res) => {
      var data = res.data.data
      _this.setData({
        Contract: data
      })
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getdata()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})