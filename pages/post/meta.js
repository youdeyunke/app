// pages/post/meta.js
var auth = require('../../utils/auth.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      loading: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
      var _this = this
      auth.ensureUser(function(user){
          _this.loadPost(q.id, function(post){
              _this.setData({ user: user, post: post, loading:false })
          })
      })
  },

  loadPost: function(pid, cb){
    var _this = this
    wx.getStorage({
        key: 'post.data.' + pid,
        success: (post) => {
            return cb(post)
        },
        fail: () => {},
        complete: () => {}
    });
      

    app.request({
      hideLoading: true,
      url: '/api/v4/posts/' + pid,
      success: function(resp){
        var post = resp.data.data
        return cb(post)
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
