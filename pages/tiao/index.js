// pages/tiao/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: []
  },

  itemPipline: function(item){
    if (!item.tiao_cover) {
      item.tiao_cover = { url: '/assets/images/logo.jpeg' }
    }
    if (!item.score) {
      item.score = 5
    }
    return item
  },

  onLoad: function (options) {
    var _this = this
    var d = {}
    app.loadPosts({ cate: 'item' }, function (resp) {
      var baseIndex = _this.data.posts.length
      var dict = {}
      resp.data.forEach(function(item , i ){
        var index = baseIndex + i
        var k = "posts[" + index + "]"
        item = _this.itemPipline(item)
        console.log('item', item)
        dict[k] = item
      })
      _this.setData(dict)
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