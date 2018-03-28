// pages/comments/new.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cats: [
      {name: '考虑看房', id: 1},
      {name: '看过该房', id: 2},
      {name: '我是业主', id: 3},
    ],

    posts: [{}],

    comment: {
      score: 1,
      cat_id: 0,
      content: '',
      target_type: 'post',
      target_id: '',
    }
  },

  scoreHandle: function(e){
    console.log('e', e)
    this.data.comment.score = e.detail.score
    this.setData({comment: this.data.comment})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.data.comment.target_id = q.target_id
    this.data.comment.target_type = q.target_type || 'post'
    this.loadTarget()
  },

  loadTarget: function(){
    var ids = this.data.comment.target_id
    var _this = this
    app.loadPosts({ids: ids}, function(res){
      _this.setData({posts: res.data})
    })
  },

  submitHandle: function(e){
    
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