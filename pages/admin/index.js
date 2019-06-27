// pages/admin/index.js
const app = getApp()
var auth = require('../../utils/auth.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuItems: [
      { name: '发布二手房', icon: 'add-square', color: '#0ddb0c', url: '/pages/post/form?group=old'},
      { name: '发布租房', icon: 'add-square', color: '#ff9501', url: '/pages/post/form?group=rental&rent_type=zhengzu' },
      { name: '房源管理', icon: 'column', color: '#59B8EB', url: '/pages/myself/posts' },  
      { name: '求购客源', icon: 'friends', color: '#4184AF', url: '/pages/need/room?cat=buy' },  
      { name: '求租客源', icon: 'friends', color: '#E15C32', url: '/pages/need/room?cat=rent' },  
      { name: '我的客源', icon: 'manager', color: '#5857CE', url: '/pages/need/room?cat=myself' },  
      { name: '我的档案', icon: 'bars', color: '#', url: '/pages/myself/broker' },                                    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  menuItemClickHandle: function(e){
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  formidHandle: function(e){
    app.uploadFormid(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    auth.ensureUser(function(user){
      _this.setData({ userInfo: user })
      if(!user.broker_profile.enable){
        wx.navigateTo({
          url: '/pages/myself/broker',
        })
      }
    })
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