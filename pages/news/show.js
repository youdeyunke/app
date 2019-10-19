// pages/news/show.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nid: null,
    homebtn: null,
    item: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    app.checkForceLogin()
    console.log('q', q)
    this.setData({nid: q.id, homebtn: q.homebtn || null})
    this.loadData()
  },

  loadData: function(){
    
    var _this = this
    app.request({
      url: '/api/v1/news/' + _this.data.nid,
      success: function(resp){
        _this.setData({
          item: resp.data.data
        })
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
    return {
      title: this.data.item.title,
      imageUrl: this.data.item.cover.url + "?imageView2/1/w/500/h/400",
      path: '/pages/news/show?homebtn=1&id=' + this.data.nid
    }
  }
})
