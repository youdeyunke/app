// pages/visitors/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      postId: '',
      items: [],
      page: 1,
      per_page: 20,
      loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
      var _this = this
      this.setData({targetId: q.targetId, targetType: q.targetType}, function(){
        _this.loadData()
      })
  },

  loadData: function(){
      var _this = this
      var query = { 
          page: this.data.page, 
          target_type: this.data.targetType, 
          target_id: this.data.targetId,
      }
      app.request({
          url: '/api/v1/visitors/',
          data: query,
          success: function(resp){
              var i = query['page']  - 1
              var data = { loading: false }
              if ( i > 0) {
                var key = 'items[' + i + ']'
                data[key] = resp.data.data
              } else {
                data['items'] = [resp.data.data]
              }
              _this.setData(data)
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
