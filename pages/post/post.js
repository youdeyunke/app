// pages/post/index.js
const app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: null,
    recoms: null,
    htmlContent: null
  },

  loadRecoms: function(postId){
    var _this = this
    app.request({
      url: '/api/v1/posts/',
      data: {pid: postId, type:'recoms'},
      success: function(resp){
        _this.setData({recoms: resp.data.data})
      },
    })
  },

  loadPost: function(postId){
    var _this = this

    app.request({
      url: '/api/v1/posts/' + postId,
      success: function(resp){
        _this.setData({post: resp.data.data})
        WxParse.wxParse('htmlContent', 'html', resp.data.data.content ,  _this, 5);

      },

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    this.loadPost(postId)
    this.loadRecoms(postId)

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
