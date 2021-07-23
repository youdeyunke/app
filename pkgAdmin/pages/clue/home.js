// pkgAdmin/pages/clue/home.js
const app = getApp() 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [], 
    summary: {},
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
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


  loadData: function(){
    // 加载线索摘要信息 
    var _this = this  
    app.request({
      url: '/api/v1/clues/summary', 
      method: 'GET', 
      success: function(resp){
        console.log('resp.data.data', resp.data.data)
        if(resp.data.status != 0){
          return false 
        }
        _this.setData({
          items: resp.data.data.items, 
          summary: resp.data.data.summary, 
          loading: false, 
        })
        console.log('resp.data.data', resp.data.data)
      }
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