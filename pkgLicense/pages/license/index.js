// pkgLicense/pages/license/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    options: [],
    page: 1,
  },
  delHandle: function (e) {
    console.log("执行")
    this.setData({
      kw: ''
    })
    this.loadData()
  },
  changeHandle: function (e) {
    this.setData({
      kw: e.detail.value
    })
  },
  loadData: function () {
    var _this = this
    var query = {
      kw: this.data.kw,
      page: this.data.page
    }
    app.request({
      url: '/api/v1/post_licenses',
      method: 'GET',
      data: query,
      success: function (res) {
        var oldData = _this.data.options
        var newData = res.data.data
        if (newData.length == 0) {
          return
        }
        var Data = oldData.concat(newData)
        _this.setData({
          options: Data
        })
      }
    })
  },
  searchHandle: function () {
    this.setData({
      page: 1,
      options: []
    })
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    wx.setNavigationBarTitle({
      title:'预售证查询'
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
    this.loadData()
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
    this.setData({
      page: this.data.page + 1
    })
    this.loadData()
  },
  onShareTimeline:function(){
    return{
        title:'西安楼盘预售证查询'
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:'西安楼盘预售证查询'
    }
  }
})