// pages/myself/myself.js
const app = getApp()

Page({
  data: {
    userInfo: null,

    loadingStatus : null,
    debugClicks: 0,
    lastViewPost: null,
    actions: [
      {name: '我的收藏'},
      {name: '我的问答'},
      {name: '帮我找房'},
      {name: '我的课程'},
      {name: '我的点评'},
      {name: '联系客服'},
    ],
    actionsB: [
      {name: '我要反馈'},
      {name: '分享给好友'},
      {name: '关于好房', url: '/pages/about/index', openType: 'navigateTo'},
    ]
  },

  debugHandle: function(e){
    console.log('debugpage_click_count ', this.data.debugClicks)
  
    this.data.debugClicks += 1
    if (this.data.debugClicks % 20 == 0) {
      wx.navigateTo({ url: '/pages/home/debug' })
    }
  },

  loginTapHandle: function(){
    var _this = this
    app.globalData.loadingStatus += 1
    console.log('abc')
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.loadData()  
  },

  bindMobileSuccess: function(){
    var _this = this

    console.log('bind mobile success func')
    var _this = this
    app.loadUserInfo(function(userInfo){
      console.log('set data to user info', userInfo)
      _this.setData({ userInfo: userInfo })   
      _this.loadData()
    })
  },

  loadData: function(){
    var _this = this
    app.getUserInfo(function (userInfo) {
      _this.setData({ userInfo: userInfo})

      if(userInfo.mobile){
        // login back ?
        var p = wx.getStorageSync('login_back_page')
        if (p) {
          wx.setStorageSync('login_back_page', null)
          wx.navigateTo({ url: p })
        }    
        var p = wx.getStorageSync('login_back_navigate_to_video')
        console.log('login back p', p)
        if(p){
          app.navigateToVideo()
        }        
      }
    })    
  },  

  actionHandle: function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    if(index == 0){
      wx.navigateTo({
        url: '/pages/myself/favposts',
      })
      return false
    }
    if(index == 4){
      wx.navigateTo({
        url: '/pages/comments/index?title=我的点评',
      })
      return
    }

    if(index == 3){

      wx.navigateToMiniProgram({
        appId: 'wxae515be8cfd1d1bc'
      })         
      return false
    }
    if(index == 5){
      wx.makePhoneCall({
          phoneNumber: app.globalData.serverMobile 
      })
      return
    }
    app.comingSoon()
  },
  actionHandleB: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      wx.makePhoneCall({
        phoneNumber: app.globalData.serverMobile
      })
      return
    }

    if(index == 2){
      wx.navigateTo({
        url: '/pages/about/index',
      })
      return
    }


    app.comingSoon()
  },

  onShow:function(){
    var _this = this
    console.log('myself.myself.onshow-----------')

    _this.setData({
      lastViewPost: wx.getStorageSync('last_view_post')
    })

    app.getUserInfo(function (userInfo) {
      if(!userInfo.mobile){
        _this.data.loginFlag = true
      }
      _this.setData({ userInfo: userInfo, loginFlag: _this.data.loginFlag })
    })    

    console.log('myself.onshow ', wx.getStorageSync('last_view_post'))
    console.log('last view post', _this.data.lastViewPost)    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
      title: '真有好房',
      desc: '真有好房',
      path: 'pages/home/home'
    }
  },
})
