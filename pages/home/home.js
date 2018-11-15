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
    limit: 5,
    hasMore: true,
    posts: [],
    tabIcons: [
      {name: '新房', url: '/pages/post/index?group=xinfang', opentype:"navigateTo", id: 'new', bg: '#fdaa3d'},
      { name: '二手', url: '/pages/post/index?group=ershoufang', opentype:"navigateTo", id: 'old', bg: '#53d8e3'},

      { name: '整租', url: '/pages/post/index?group=zufang&rent_type=zhengzu', opentype:"navigateTo", id: 'rent_house', bg: '#65b455'},
      { name: '合租', url: '/pages/post/index?group=zufang&rent_type=hezu', opentype:"navigateTo", id: 'rent_room', bg: '#d578e3'},

      { name: '找室友', url: '/pages/need/roommate', opentype: "navigateTo", id: 'shiyou', bg: '#4c9ef0' },

      { name: '找房', url: '/pages/need/room', opentype: "navigateTo", id: 'zhao', bg: '#f67350' }      

    ]
  },

  comming: function(e){
    wx.showToast({
      title: '功能正在调试中',
      icon: 'none',
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
      title: '',
      desc: '',
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
    this.selectComponent('#slider').loadData()

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

  loadPosts: function(){},

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
