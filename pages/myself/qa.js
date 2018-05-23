// pages/myself/qa.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replied: [],
    unreplied: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },

  gotoNew: function(e){
    console.log('submit', e)
    app.uploadFormId(e)
    wx.navigateTo({
      url: '/pages/qa/new'
    })
  },

  itemHandle: function(e){
    console.log(e)
    var qid = e.currentTarget.dataset['qid']
    wx.navigateTo({ url: '/pages/qa/qa?id=' + qid })
  },

  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/myself/questions',
      success: function(resp){
        if (resp.data.data.replied.length == 0 && resp.data.data.unreplied.length == 0){
          wx.showModal({
            title: '没有数据',
            content: '您还没有咨询过任何问题',
            success: function (res) {
              wx.navigateBack({
                delta: -1
              })
            }
          })

          return
        }
        _this.setData({
          replied: resp.data.data.replied,
          unreplied: resp.data.data.unreplied
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