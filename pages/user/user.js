// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userId: null,
    currentTabIndex: 0,
    tabs: [
      //{label: '新房', group: 'xinfang' },
      {label: '二手房', group: 'ershoufang'},
      {label: '租房', group: 'zufang'},
    ],
  },

  tabClick: function(e){
    console.log('e', e)
    this.setData({currentTabIndex: e.detail.index})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    this.setData({
      userId: q.id
    }, function(){
      console.log('fuck')
      _this.loadUserInfo()
    })

  },

  loadUserInfo: function(){
    var uid = this.data.userId
    var _this = this
    app.request({
      url: '/api/v1/users/' + uid,
      success: function(resp){
        _this.setData({userInfo: resp.data.data})
        _this.setPageTitle()
        _this.loadPosts()
      }
    })
  },

  loadPosts: function(){
    /* 加载指定用户发布的房源列表 */
    var _this = this
    var uid = this.data.userId
    
    app.request({
      url: '/api/v2/posts',
      data: {'user_id': uid},
      success: function(resp){
        _this.updatePosts(resp.data.data)
      }
    })
  },

  updatePosts: function(posts){
    /* 将posts归类到不同的tab 下 */
    var _this = this
    var xinfangItems = []
    var ershoufangItems = []
    var zufangItems = []
    posts.forEach(function(post, i){
      switch(post.group){
        case 'new':
          xinfangItems.push(post)
          break;
        case 'old':
          ershoufangItems.push(post)
          break;
        case 'rental':
          zufangItems.push(post)
          break;
      }
      if(i == posts.length - 1){
        _this.setData({
          xinfangItems: xinfangItems,
          ershoufangItems: ershoufangItems,
          zufangItems: zufangItems,
        })
      }
    })
    

  },

  setPageTitle: function(){
    var _this = this
    wx.setNavigationBarTitle({
      title:''
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