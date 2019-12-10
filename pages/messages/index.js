// pages/messages/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: null,
    isLogin: false,
    sleepTime: 1000,
    iid: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title: '消息'})
  },

  stopInterval: function(){
    // 退出后要关闭定时器
    var iid = this.data.iid
    if(iid){
      clearInterval(iid)
      this.setData({iid: null})
      console.log('已停止定时器')
    }
  },

  startInterval: function(){
    // 开启定时器，并防止重复
    var _this = this
    var t =  5 * 1000
    var iid = setInterval(_this.loadData, t)
    this.setData({iid: iid})
    console.log('开启定时器，刷新聊天列表', t)
  },

  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/chat_lists/',
      hideLoading: true,
      success: function (res) {
        if (res.data.status == 0) {
          _this.setData({ items: res.data.data, sleepTime: res.data.sleep })
        }
      },
      complete: function(res){
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
    var userInfo = app.globalData.userInfo
    console.log('app.globalData.userInfo messages/index.js', app.globalData.userInfo)
    if(userInfo){
      var ext = app.globalData.EXT
      this.loadData()
      this.stopInterval()
      this.startInterval()
      // 进入到聊天列表页面，就清空小红点
      wx.hideTabBarRedDot({index: 1})
      app.globalData['reddot'] = 0
    }
    this.setData({userInfo: userInfo})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.stopInterval()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.stopInterval()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadData()
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
