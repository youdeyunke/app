// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    filter: {user_id: '', order: 'id desc', group: 'ershoufang', per_page: 8},
    userId: null,
    currentTabIndex: 0,
    page: 1,
    icons: [
      {id: 'mobile', bindtap:"callMe"},
      {id: 'wechat', bindtap: 'copyWechat'},
    ],
    tabs: [
      //{label: '新房', group: 'xinfang' },
      {label: '在售房源', group: 'ershoufang'},
      {label: '在租房源', group: 'zufang'},
    ],
  },

  callMe: function(e){
    var mobile = this.data.userInfo.mobile
    if (!mobile) {
      return false
    }

    wx.makePhoneCall({
      phoneNumber: mobile
    })    
  },

  copyWechat: function(e){
    var wechat = this.data.userInfo.wechat
    if (!wechat) {
      return false
    }

    wx.setClipboardData({
      data: wechat,
      success: function (res) {
        wx.showTosta({
          title: '微信号已复制',
          icon: 'none',
        })
      }
    })
  },

  tabChange: function(e){
     var i = e.detail.index
     var tab = this.data.tabs[i]
     var filter = this.data.filter
     filter['group'] = tab.group
     this.setData({
         page: 1,
         filter:  filter
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this = this
    var filter = this.data.filter
    filter['user_id'] = q.id
    this.setData({
      userId: q.id,
      filter: filter,
    }, function(){
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
      data: {'user_id': uid, per_page: 9999},
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

  showAvatar: function(){
      var _this =this
      wx.previewImage({
          current: _this.data.userInfo.avatar,
          urls: [_this.data.userInfo.avatar],
          success: (result) => {
              
          },
          fail: () => {},
          complete: () => {}
      });
        
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
    var _this = this
    this.setData({
      page: _this.data.page + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
