// pages/home/home.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    city_id: null,
    offset: 0,
    total: 0,
    limit: 10,
    hasMore: true,
    posts: [],
    tabIcons: [
      { name: '全部房源', url: '/pages/post/index', opentype:"navigateTo", id: 'all'},
      {name: '热卖楼盘', url: '/pages/post/index', opentype:"navigateTo", id: 'hot'},
      { name: '二手房源', url: '/pages/post/index', opentype:"navigateTo", id: 'youhui'},
      { name: '最新开盘', url: '/pages/post/index', opentype: "navigateTo", id: 'new' }      

    ]
  },

  comming: function(e){
    wx.showToast({
      title: '功能正在调试中',
      icon: 'none',
    })
  },

  xuezhishi: function(e){
    wx.navigateToMiniProgram({
      appId: 'wxae515be8cfd1d1bc'
    })    
  },

  cityHandle: function(e){
    console.log('city change handle', e.detail.city)
    var _this = this
    _this.setData({city_id: e.detail.city.id, posts: [], offset: 0})
    app.loadPosts(_this)  
  },

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
    var _this = this
    _this.setData({
      posts: [],
      offset: 0,
      hasMore: true,
    })
    app.loadPosts(_this)
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh() //停止下拉刷新    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this   
    app.loadPosts(_this)
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    _this.setData({
      offset: _this.data.offset + _this.data.limit,
    })
    app.loadPosts(_this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
