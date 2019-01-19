// pages/messages/index.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    senderId: null,
    messages: [],
    lastId: null,
    firstId: null,
    newMessageId: 0,
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
      _this.startInterval()
    })
  },

  startInterval: function(){
    // 开启定时器，并防止重复
    var _this = this
    var key = 'message.show.interval.id'
    var t =  5000
    var iid = wx.getStorageSync(key)
    if(iid){
      clearInterval(iid)
    }

    var iid = setInterval(_this.loadData, t)
    wx.setStorageSync(key, iid)
    console.log('开启定时器，刷新聊天内容', t)
  },

  markMessageId: function(i){
    // 处理消息ID的标记
    var lastId = this.data.lastId || 0
    var firstId = this.data.firstId || null
    if(i > lastId ){
      this.setData({lastId: i})
      console.log('last id is ', this.data.lastId)
    }
    if(!firstId || i < firstId){
      this.setData({firstId: i})
      console.log('first id is ', this.data.firstId)
    }
  },

  saveMessage: function(message){
    // 将每一条消息内容都缓存起来，只需维护一个消息内容的id列表即可
    wx.setStorageSync('message.' + message.id, message)
  },

  sendHandle: function(value){
    //  记录最新消息ID
    this.setData({newMessageId: value.detail.id})
    // 发送成功处理
    this.saveMessage(value.detail)
    // 刷新消息列表
    this.loadData()
  },

  loadOld: function(){
    // 加载旧的聊天列表
    var _this = this
    app.request({
      url: '/api/v1/messages',
      method: 'GET',
      data: {
        target_id: _this.data.targetUserId,
        first_id: _this.data.firstId,
        ranking: 'older',
      },
      success: function(resp){
        if(resp.data.status != 0){
          return false
        }
        var messages = resp.data.data
        if(messages.length == 0){
          return 
        }

        var items = _this.data.messages
        items.unshift(messages)
        _this.setData({messages: items})
      },
    })
  },


  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/messages',
      method: 'GET',
      hideLoading: true,
      data: {
        last_id: _this.data.lastId,
        target_id: _this.data.targetUserId,
        ranking: 'newer',
      },
      success: function(resp){
        if(resp.data.status != 0){
          console.log('return false')
          return false
        }

        var d = {}
        var items = resp.data.data
        items.forEach(function(message, i){
          _this.saveMessage(message)
          _this.markMessageId(message.id)
        })
        var len = _this.data.messages.length
        var k = 'messages[' + len + ']'
        d[k] = items.reverse()
        d['sleepTime'] = resp.data.sleep
        _this.setData(d)
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
    this.loadOld()
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
