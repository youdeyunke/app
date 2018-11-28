// pages/messages/index.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    senderId: null,
    messageIds: [],
    user: {},
    polling: false,
    sleepTime: 60 * 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    this.setData({
      targetUserId: q.target_user_id
    })
    auth.ensureUser(function(user){
      if(user.id.toString() == q.target_user_id.toString()){
        wx.switchTab({url: '/pages/home/home'})
      }
      _this.setData({user: user})
    })
  },


  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/messages',
      method: 'GET',
      hideLoading: true,
      data: {
        last_id: 0,
        target_id: _this.data.targetUserId
      },
      success: function(resp){
        if(resp.data.status == 0){
          var ids = _this.data.messageIds
          resp.data.data.forEach(function(message, i){
            // 将每一条消息内容都缓存起来，只需维护一个消息内容的id列表即可
            wx.setStorageSync('message.' + message.id, message)
            ids.push(message.id)
          })
          d['sleepTime'] = resp.data.sleep
          _this.setData(d)
        }
      },
      complete: function(res){
        if(_this.data.polling){
          console.log('polling ... ')
          setTimeout(_this.loadData, _this.data.sleepTime)
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
    this.setData({polling: true})
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ polling: false })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({ polling: false })
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
