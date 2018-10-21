// pages/home/home.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    publishSheetShow: false,
    publishActions: [
      {name: '发布整租房源', group: 'rental', rent_type: 1},
      {name: '发布合租房源', group: 'rental', rent_type: 0 },
      //{name: '发布二手房房源', group: 'old'  },

    ],
    city_id: null,
    offset: 0,
    total: 0,
    limit: 5,
    hasMore: true,
    posts: [],
    tabIcons: [
      { name: '整租', url: '/pages/post/index?group=zufang&rent_type=zhengzu', opentype:"navigateTo", id: 'rent_house', bg: '#65b455'},
      { name: '合租', url: '/pages/post/index?group=zufang&rent_type=hezu', opentype:"navigateTo", id: 'rent_room', bg: '#d578e3'},

      { name: '定制找房', url: '/pages/myself/zhao', opentype: "navigateTo", id: 'zhao', bg: '#f67350' }      

    ]
  },

  comming: function(e){
    wx.showToast({
      title: '功能正在调试中',
      icon: 'none',
    })
  },

  publishClose: function(e){
    this.setData({
      publishSheetShow: false
    })
  },

  publishClick: function(e){
    console.log('e', e)    
    wx.navigateTo({
      url: '/pages/post/form?group=' + e.detail.group + '&rent_type=' + e.detail.rent_type,
    })
  },

  publishHandle: function(e){
    // 点击发布按钮，弹出选择框
    this.setData({
      publishSheetShow: true,
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
    this.setData({
      publishSheetShow: false,
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
