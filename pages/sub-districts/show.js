// pages/sub-districts/show.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultImgs: ['/assets/images/cover-none.png'],
    htmlContent: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({
      id: q.id,
      from_share: q.from_share || 0,
      sub: wx.getStorageSync('subdistrict.' + q.id),
      postQuery: { sub_district_id: q.id, },
      oldPostQuery: { sub_district_id: q.id, group: 'ershoufang', per_page: 3,},
      rentPostQuery: { sub_district_id: q.id, group: 'zufang', per_page: 3},

    })
    this.loadData()
  },

  gotoPostIndex: function(group){
    var _this = this
    wx.navigateTo({
      url: '/pages/post/index?sub_district_id=' +_this.data.id + '&group=' + group || 'old',
    })
  },

  gotoOldPost: function(){
    this.gotoPostIndex('ershoufang')
  },

  gotoRentalPost: function () {
    this.gotoPostIndex('zufang')
  },  


  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/sub_districts/' + _this.data.id,
      success: function (resp) {
        _this.setData({
          sub: resp.data.data
        })
      },
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
