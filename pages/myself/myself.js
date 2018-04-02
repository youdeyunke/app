// pages/myself/myself.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    loginFlag: null,
    loadingStatus : null,
    debugClicks: 0,
    lastViewPost: null,
    actions: [
      {name: '我的收藏'},
      {name: '我的点评'},
      {name: '帮我找房'},
      {name: '我的课程'},
      {name: '看房记录'},
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

  bindMobileHandle: function(e){
    console.log(e.detail.errMsg) 
    console.log(e.detail.iv) 
    console.log(e.detail.encryptedData) 
    var _this  = this
    app.request({
      url: '/api/v1/users/bind_xcx_mobile',
      method: 'POST',
      data: { iv: e.detail.iv, encryptedData: e.detail.encryptedData },
      success: function(resp){
        _this.setData({userInfo: resp.data.data})
        app.globalData.userInfo = resp.data.data
        wx.setStorageSync('userInfo', resp.data.data)
        wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },

  loadData: function(){
    console.log('load data event')
    app.globalData.userInfo = null
    var _this = this
    app.getUserInfo(function (userInfo) {
      _this.data.userInfo = userInfo
      _this.data.loginFlag = !userInfo.mobile ? true: false

      _this.setData({ userInfo: _this.data.userInfo, loginFlag: _this.data.loginFlag })
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
    if(index == 1){
      wx.navigateTo({
        url: '/pages/comments/index?title=我的点评',
      })
      return
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
