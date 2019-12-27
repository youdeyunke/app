// pages/home/home.js
const app = getApp()
const EXT = wx.getExtConfigSync()
const rowWidthItem = ['60%', "100%", "30%", "40%", "100%"]

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    loading:true,
    rowWidth: rowWidthItem ,
    homeData: [],
    system: {},
    showInstallTips: 0,  // 1:正常显示，2：自动关闭，3：手动关闭
    configs : {},
    city_id: null,
    ext: {},
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

  gotoSubs: function(e){
     wx.navigateTo({url: '/pages/sub-districts/index'})
  },

  gotoSale: function(e){
     wx.navigateTo({url: '/pages/owner/sale?group=old'})
  },

  gotoMap: function(e){
     wx.navigateTo({url: '/pages/map/index'})
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({loading: true})
    this.loadHomeData()
    var _this = this
    app.loadConfigs( function(configs){
        _this.setData({configs: configs})
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh() //停止下拉刷新    
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this   
    var name = EXT['name'] || '首页'
    app.ensureConfigs( (configs) => {
      this.setData({ system: app.globalData.system, ext: EXT, configs: configs })
    })
    this.checkInstallTips()
    this.loadHomeData()
    wx.setNavigationBarTitle({title: name})
  },

  loadHomeData: function(){
      // 一次性加载首页所需数据
      var _this = this
      this.setData({loading: true})
      app.request({
          url: '/api/v1/home',
          method: 'GET',
          hideLoading: true,
          success: function(resp){
              _this.setData({
                homeData: resp.data.data,
                loading: false,
              })
          },
      })
  },

  checkInstallTips: function(){
    var _this = this
    var _v= wx.getStorageSync('closeInstallTips') || false
    // 没有手动关闭提示，就正常显示
    if(!_v){
       setTimeout(function(){  _this.setData({showInstallTips: 1})  }, 4000)
        // 延时自动关闭
       setTimeout(function(){  _this.setData({showInstallTips: 0})  }, 8000)
    }
  },

  closeInstallTips: function(e){
      // 点击关闭安装提示
      this.setData({'showInstallTips': 0})
      wx.setStorageSync( 'closeInstallTips', true)
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
    app.checkForceLogin()
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
