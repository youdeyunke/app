// pkgSearch/page/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    searchRecord: []
  },
  historysearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || []
    })
  },
  inputHandle: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  searchHandle: function (e) {
    var searchRecord = this.data.searchRecord
    var value = this.data.value
    if (value == '') {
      return
    } else {
      searchRecord.unshift({
        value: value,
        id: searchRecord.length
      })
      wx.setStorageSync('searchRecord', searchRecord)
    }
    wx.navigateTo({
      url: '/pages/post/index?text='+ value
    })
  },
  clearHandle:function(){
    var _this = this
    wx.showModal({
      title:'您确定要删除记录吗？',
      success:function(res){
        if(res.confirm){
          wx.clearStorageSync('searchRecord')
          _this.setData({
            searchRecord:[]
          })
        }
      }
    })

  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.historysearch()
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