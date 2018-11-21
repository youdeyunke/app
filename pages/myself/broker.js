// pages/myself/broker.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    broker_apply_id: wx.getStorageSync('broker_apply_id'),
    steps: [
      '提交资料',
      '后台审核',
      '发布房源',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  validate: function(data, cb){
    if(!data.name){
      wx.showToast({
        title: '姓名不能为空',
      })
      return false
    }
    if(!data.mobile && !data.wechat){
      wx.showToast({
        title: '手机号和微信号至少填写一个',
      })
      return false
    }

    return cb(data)

  },

  doPost: function(data){
    var _this = this
    app.request({
      url: '/api/v2/broker_applies',
      data: {broker: data},
      method: "post",
      success: function(resp){
        if(resp.data.status  == 0){
          var aid = resp.data.data
          wx.setStorageSync('broker_apply_id', aid)
          _this.setData({'broker_apply_id': aid})
        }
      },
    })
  },

  submitHandle: function(e){
    var _this = this
    var data = e.detail.value
    this.validate(data, (vdata) => {
      _this.doPost(vdata)
    })
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