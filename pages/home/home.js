// pages/home/home.js
const app = getApp()
const EXT = wx.getExtConfigSync()

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    city_id: null,
    posts: [],
    newFilter: {
      group: 'xinfang',
      per_page: 5,
      order:'id desc',
    },
    oldFilter: {
      group: 'ershoufang',
      per_page: 5,
      order: 'id desc',
    },
    rentFilter: {
      group: 'zufang',
      per_page: 5,
      order: 'id desc',
    },    

  },

  comming: function(e){
    wx.showToast({
      title: '功能正在调试中',
      icon: 'none',
    })
  },


  formidHandle: function(e){
    app.uploadFormId(e)
  },

  gotoZhaofang: function(e){
     wx.navigateTo({url: '/pages/need/room-form'})
  },

  cityHandle: function(e){
    _this.setData({city_id: e.detail.city.id, posts: [], offset: 0})
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
    var _this = this
    wx.stopPullDownRefresh()
    wx.showNavigationBarLoading() //在标题栏中显示加载
    app.loadConfigs(function(configs){
      _this.setData({configs: configs})
    })
    var navs = this.selectComponent('#navs')
    var slider = this.selectComponent('#slider')
    var oldPosts = this.selectComponent('#old-posts')
    var newPosts = this.selectComponent('#new-posts')
    var rentPosts = this.selectComponent('#rent-posts')

    navs && navs.loadData()
    slider && slider.loadData()
    newPosts && newPosts.loadData()
    oldPosts && oldPosts.loadData()
    rentPosts && rentPosts.loadData()
    console.log('rent posts', rentPosts)


    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh() //停止下拉刷新    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkForceLogin()
    var name = EXT['name'] || '首页'
    wx.setNavigationBarTitle({title: name})
    var _this = this   
    var configs = wx.getStorageSync('myconfigs') || {}
    this.setData({configs: configs})

    // 从推送通知点击，直接进入下一集菜单时，会没有返回按钮，这里做一次跳转
    if(options.r){
      var rds = options.r.split('-')
      var page = rds[0]
      var value = rds[1]
      switch(page){
        case 'needroom':
          wx.navigateTo({
            url: '/pages/need/room-show?id=',
          })
          break;
      }
    }



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
      var ext = app.globalData.EXT
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
