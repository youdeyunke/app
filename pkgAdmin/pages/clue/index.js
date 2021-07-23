// pkgAdmin/pages/clue/index.js
const app = getApp() 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [], 
    status: {},
    statusId: null, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({
      statusId: q.id || q.status_id, 
    })

    this.loadData()

  },

  loadData: function(){
    var _this = this  
    app.request({
      url: '/api/v1/clues/?status_id=' + _this.data.statusId,
      success: function(resp){
        if(resp.data.status != 0){
          return
        }
        _this.setData({
          items: resp.data.data.items, 
          status: resp.data.data.status, 
        })
        var pageTitle = resp.data.data.status.name + '-线索列表'
        wx.setNavigationBarTitle({
          title: pageTitle,
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
    console.log('on show', app.globalData.backToReload )
    if(app.globalData.backToReload){
      this.loadData()
    }
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