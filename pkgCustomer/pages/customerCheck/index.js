// pkgCustomer/pages/customerCheck/index.js
const customerApi = require("../../../api/customer")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    show: false,
    customer: null,
  },

  mobileChange(e){
    this.setData({
      mobile: e.detail
    })
  },

  checkData(){
    var _this = this
    var data = {
      mobile: this.data.mobile
    }
    customerApi.checkCustormer(data).then((resp) => {
      if (resp.data.status != 0) {
        return
      }
      if(!resp.data.data) {
        _this.setData({
          customer: resp.data.data,
          show: true,
        })
      } else {
        _this.setData({
          customer: resp.data.data,
          show: false,
        })
      }
    })
  },

  cancleHandle(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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