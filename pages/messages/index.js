// pages/messages/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: null,
    sleepTime: 1000,
    iidKey:  'message.index.interval.id',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title: '消息'})
    this.loadData()
  },

  stopInterval: function(){
    // 退出后要关闭定时器
    var iid = wx.getStorageSync(this.data.iidKey)
    if(iid){
      clearInterval(iid)
      wx.setStorageSync(this.data.iidKey, null)
      console.log('已停止定时器')
    }
  },

  startInterval: function(){
    // 开启定时器，并防止重复
    var _this = this
    var t =  15000
    var iid = setInterval(_this.loadData, t)
    wx.setStorageSync(this.data.iidKey, iid)
    console.log('开启定时器，刷新聊天列表', t)
  },

  loadData: function(){
    var _this = this
    console.log('load data')
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
    // 从对话界面退出
    this.loadData()
    this.stopInterval()
    this.startInterval()
    wx.hideTabBarRedDot({index: 1})
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
