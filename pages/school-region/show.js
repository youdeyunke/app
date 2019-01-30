// pages/school-region/show.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({sid: q.id})
    this.loadData()
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

  cellHandle: function(e){
    console.log('e', e)
    var i = e.currentTarget.dataset.index
    var section = this.data.item.sections[i]

    if(!section.content){
      return false;
    }

    this.setData({
      currentSectionIndex: i,
      currentSection: section,
    })    
    this.showPop()
  },


  showPop: function(){
    this.setData({showDetail: true})
  },

  closePop: function () {
    this.setData({ showDetail: false })
  },

  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/schools/' + _this.data.sid,
      data: {},
      success: function(resp){
        _this.setData({item: resp.data.data})
      }
    })
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