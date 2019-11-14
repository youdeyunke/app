// pages/myself/posts.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {label: '二手房源', group_v2: 'old'},
      {label: '新房房源', group_v2: 'new' },
      {label: '出租房源', group_v2: 'rental'},
    ],
    group_v2: 'old',
    userInfo: null,
    searchText: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    auth.ensureUser((userInfo) => {
      _this.setData({userInfo: userInfo}, () => {
        _this.loadPosts()
      })
    })

  },


  searchTextInput: function(e){
    this.setData({searchText: e.detail})
  },

  clearSearch: function(e){
    this.setData({searchText: ''})
    this.loadPosts()
  },

  tabChange: function(e){
     var i = e.detail.name
     var tab = this.data.tabs[i]
     var filter = this.data.filter
     this.setData({ page: 1, group_v2: tab.group_v2, loading: true })
     this.loadPosts()
  },

  loadPosts: function(){
    /* 拉取我的房源 */
    var _this = this
    var userId = this.data.userInfo.id

    app.request({
      url: '/api/v2/posts/',
      data: {'user_id': userId, per_page : 999, text: _this.data.searchText,   group_v2: _this.data.group_v2},
      success: function(resp){
        if(!resp.data.status == 0){
            wx.showModal({
              title: '崩溃了',
              content: '服务器出现错误，请稍后再试',
            })
          return false
        }
        _this.setData({
          posts: resp.data.data,
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
    wx.setNavigationBarTitle({
      title: '我的房源',
    })
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
    var _this = this
    this.setData({post: []}, () => {
      _this.loadPosts()
    })
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
