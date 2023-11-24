/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: UDEVE Team <tech@udeve.cn>
 * +----------------------------------------------------------------------
 */
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
    text: ""
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
          text: '没有找到手机号为' + data.mobile + '的用户数据'
        })
      } else {
        _this.setData({
          customer: resp.data.data,
          show: false,
          text: ''
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