// pages/home/home.js
const app = getApp()
const EXT = wx.getExtConfigSync()

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    loading:true,
    system: {},
    showInstallTips: 0,  // 1:正常显示，2：自动关闭，3：手动关闭
    configs : {},
    city_id: null,
    ext: {},
    showNewVersionWindow: false,
    posts: [],
    newFilter: {
      group_v2: 'new',
      per_page: 5,
      order:'id desc',
    },
    oldFilter: {
      group_v2: 'old',
      per_page: 5,
      order: 'id desc',
    },
    rentFilter: {
      group_v2: 'rental',
      per_page: 5,
      order: 'id desc',
    },    
    shopFilter: {
      group_v2: 'shop',
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
    var _this = this
    app.loadConfigs( function(configs){
        _this.setNav(configs)
        _this.setData({configs: configs})
    })
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
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh() //停止下拉刷新    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this   
    _this.setData({system: app.globalData.system})
    app.ensureConfigs(function(configs){
      console.log('configs is', configs)
      var name = EXT['name'] || '首页'
      _this.setData({configs: configs, ext: EXT, loading: false})
      _this.checkInstallTips()
      wx.setNavigationBarTitle({title: name})
      _this.setNav(configs)
      setTimeout(function(){  _this.checkNewVersion() }, 1000)

    })
  },

  setNav: function(configs){
      var bgColor = configs.plugin_home_topbar_color_desc 
      var frontColor = configs.plugin_home_topbar_front_color_desc
      console.log('bgcolor', bgColor, 'front color',  frontColor)
      wx.setNavigationBarColor({
        frontColor: frontColor,
        backgroundColor: bgColor,
        animation: { duration: 400, timingFunc: 'easeIn' }
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
  
  markNewVersion: function(e){
    // 本地保存最新版本号，以便下次比对
    var _this = this
    wx.setStorage({key: 'version', data: EXT.version, success: function(res){
      _this.setData({showNewVersionWindow: false})
    }})
  },


  checkNewVersion: function(){
      var _this = this
      // 检查新版本，并弹出提示
      wx.getStorage({key: 'version', success: function(res){
          if(res.data != EXT.version){
              // 新版本，提示
              _this.setData({showNewVersionWindow: true})
          }
        },
        fail: function(res){
            // 没有读取到本地保存的版本号码，说明是第一次进入系统
            _this.markNewVersion()
        },

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
