// pages/pagemaker/show.js
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
    this.setData({
      pageId: q.id,
      pagekye: q.key,
    })

  },
  backHandle: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  homeHandle: function () {
    wx.switchTab({
      url: '/pages/home/home',
      success: (result) => {

      },
    });
  },


  pageReadyHandle: function (e) {
    var config = e.detail
    // 页面加载完成
    var pageTitle = config.title.value || app.globalData.myconfig.xcx_name
    var shareCover = config.shareCover
    var shareTitle = config.shareTitle || pageTitle
    var titleBgColor = config.title.bgColor
    var titleFontColor = config.title.color

    this.setData({
      shareCover: shareCover,
      shareTitle: shareTitle,
      titleBgColor: titleBgColor,
      titleFontColor: titleFontColor,
      pageTitle: pageTitle,
      loading: false
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




  onShareAppMessage: function () {
    var _this = this
    return {
      title: _this.data.shareTitle,
      imageUrl: _this.data.shareCover,
    }


  },
  onShareTimeline: function () {
    var _this = this
    return {
      title: _this.data.shareTitle,
      imageUrl: _this.data.shareCover,
    }

  }


})