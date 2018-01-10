// pages/home/home.js
Page({

  onShareAppMessage: function () {
    return {
      title: '真有好房',
      desc: '真有好房',
      path: 'pages/index/index'
    }
  },

  /** 下拉刷新
   * 
  */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 150);
  },

  /**
   * 页面的初始数据
   */
  data: {
    selectedCity: 0,
    cityList: ['上海', '北京', '广州'],
    tabIcons: [
      {name: '看测评', url: '/pages/home/home'},
      {name: '问专家', url: '/pages/home/home'},
      {name :'挑好房', url: '/pages/home/home'},
      {name: '学知识', url: '/pages/home/home'},
    ]
  },

  cityChangeHandle: function(e){
    this.setData({ selectedCity: e.detail.value})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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