// pages/home/home.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    posts: [],
    tabIcons: [
      {name: '看测评', url: '/pages/post/index', opentype:"navigate"},
      {name: '问专家', url: '/pages/qa/index', opentype:"switchTab"},
      {name :'挑好房', url: '/pages/home/home', opentype:"switchTab"},
      {name: '学知识', url: '/pages/home/home', opentype:"switchTab"},
    ]
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

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 150);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    app.loadPosts(function(resp){
      console.log('home.js posts:', resp.data)
      _this.setData({posts: resp.data})
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
