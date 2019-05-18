// pages/goods/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    page: 1,
    per_page: 10,
    order: 'id desc',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadItems()
  },

  loadItems: function(){
    var _this = this
    var query = {
      cat: 'gooditem',
      page: _this.data.page,
      per_page: _this.data.per_page,
      order: _this.data.order,
    }
    app.request({
      url: '/api/v1/topics',
      data: query,
      success: function(resp){
        if(resp.data.status == 1){
          return false
        }
        if(resp.data.meta.out_of_bounds){
          return false
        }
        var data = {}
        var index = _this.data.page - 1
        var key = 'items[' + index + ']'
        data[key] = resp.data.data
        _this.setData(data)

      }
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
    this.setData({page: 1})
    this.loadItems()
  },  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var page = this.data.page + 1
      this.setData({page: page})
      this.loadItems()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})