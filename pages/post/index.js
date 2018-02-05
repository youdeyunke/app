// pages/post/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemPosts: [],
    blockPosts: []
  },


  onLoad: function (options) {
    var _this = this
    app.loadPosts({cate: 'item'} ,function(resp){
      console.log('home.js posts:', resp.data)
      _this.setData({itemPosts: resp.data})
    })

    app.loadPosts({cate: 'block'}, function(resp){
      console.log('home.js posts:', resp.data)
      _this.setData({blockPosts: resp.data})
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
