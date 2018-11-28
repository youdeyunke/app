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
    currentAction: 1,
    group: 'old',
    tabColors: [
      '4BC587',
      'F7B264',
      'F5D04F',
      'F17276',
      '67B1FD',
      'F7B263',
      '62D182',
      '5AC0E5',
      '5DD2B9',
      '9291DF',
    ],
    tabIcons: [
      { name: '二手房', url: '/pages/post/index?group=ershoufang', opentype:"navigateTo", id: 'old', },
      { name: '租房', url: '/pages/post/index?group=zufang&rent_type=zhengzu', opentype:"navigateTo", id: 'rent_house', },
      { name: '新房', url: '/pages/post/index?group=xinfang', opentype:"navigateTo", id: 'new', },
      { name: '我要卖房', url: '/pages/post/form?group=old', opentype:"navigateTo", id: 'sale', },
      { name: '我要出租', url: '/pages/post/form?group=rental&rent_type=zhengzu', opentype:"navigateTo", id: 'rent', },
      { name: '全景看房', url: '/pages/post/index?is_vr=true', opentype:"navigateTo", id: 'qjkf', },
      { name: '定制找房', url: '/pages/need/room', opentype: "navigateTo", id: 'zhao',  },
      { name: '楼市资讯', url: '/pages/need/room', opentype: "navigateTo", id: 'zhao',  },
      { name: '加入我们', url: '/pages/about/join', opentype:"navigateTo", id: 'join', },
      { name: '公司介绍', url: '/pages/about/index', opentype:"navigateTo", id: 'about', },

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

  action1Click: function(){
    this.setData({
      group: 'old',
      currentAction: 1,
      offset: 0,
      hasMore: true,
    })
    app.loadPosts(this)
  },
  action2Click: function(){
    this.setData({
      group: 'rental',
      currentAction: 2,
      offset: 0,
      hasMore: true,
    })
    app.loadPosts(this)
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
