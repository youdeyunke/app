// pages/home/home.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    loginFlag: true,
    city_id: null,
    offset: 0,
    total: 0,
    limit: 10,
    hasMore: true,
    posts: [],
    tabIcons: [
      {name: '看测评', url: '/pages/post/index', opentype:"navigateTo"},
      {name: '问专家', url: '/pages/qa/index', opentype:"switchTab"},
      {name :'挑好房', url: '/pages/tiao/index', opentype:"switchTab"}
    ]
  },

  xuezhishi: function(e){
    wx.navigateToMiniProgram({
      appId: ''
    })    

  },

  cityHandle: function(e){
    console.log('city change handle', e.detail.city)
    var _this = this
    _this.setData({city_id: e.detail.city.id, posts: [], offset: 0})
    _this.loadPosts()  
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
    console.log('pull down refresh')
    _this.setData({
      posts: [],
      offset: 0,
      hasMore: true,
    })
    _this.loadPosts()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh() //停止下拉刷新    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    app.getUserInfo(function (userInfo) {
      _this.setData({ userInfo: userInfo })
    })    
    _this.loadPosts()
  },

  loadPosts: function(){
    var _this = this
    if(!_this.data.hasMore){
      return false
    }
    var query = {
      city_id: _this.data.city_id || '',
      offset: _this.data.offset || 0,
      limit: _this.data.limit || 0,
    }
    app.loadPosts(query, function (resp) {
      console.log('home.js posts:', resp.data)
      var d = {}
      var k = "posts[" + _this.data.offset + "]"
      d[k] = resp.data
      if(resp.data.length == 0){
        d.hasMore = false
      }
      d.offset = resp.paginate.offset
      _this.setData(d)
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    _this.setData({
      offset: _this.data.offset + _this.data.limit,
    })
    _this.loadPosts()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
