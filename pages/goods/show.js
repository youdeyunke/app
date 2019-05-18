// pages/goods/show.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    this.loadItem(params.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goto: function(){
      var _this = this
      wx.showLoading({
        title: '正在打开地图',
        mask: true
      })

      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = parseFloat(_this.data.item.sub_district.latitude)
          const longitude = parseFloat(_this.data.item.sub_district.longitude)
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          })
          wx.hideLoading()
        }
      })
  },

  loadItem: function(tid){
      var _this = this
      app.request({
          url: '/api/v1/topics/' + tid,
          success: function(resp){
              if(resp.data.status != 0){
                  return false;
              }
              _this.setData({item: resp.data.data})
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