// pages/messages/index.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    senderId: null,
    page: 1,
    messages: [],
    user: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({
      targetUserId: q.target_user_id
    })
    var _this = this
    auth.ensureUser(function(user){
      _this.setData({user: user})
      _this.loadData()
    })
  },

  refresh: function(){
    this.setData({
      page: 1,
    })
    this.loadData()
  },

  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/messages',
      method: 'GET',
      data: {
        page: _this.data.page,
        target_id: _this.data.targetUserId
      },
      success: function(resp){
        if(resp.data.status == 0){
          var messages = resp.data.data.reverse()
          var i = this.data.page - 1
          var d = {}
          if(i == 0){
            d = {messages: [messages]}
          }else{
            var key = 'messages[' + i + ']'
            d[key] = messages
          }
          _this.setData(d)
          console.log('messages', _this.data.messages)
        }
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

  }
})