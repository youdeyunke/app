// pages/myself/profile.js
const app = getApp()
var auth = require('../../utils/auth.js');
var qiniu = require('../../utils/qiniu.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: { },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
      this.loadUser()
  },

  submitHandle: function(e){
      var data = e.detail.value
  },

  chooseImage: function(e){
      var _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        success (res) {
          const path = res.tempFilePaths[0]
          qiniu.upload(path, (url) => {
              console.log('avatar url is', url)
              _this.updateAvatar(url)
          })
        }
    })
  },

  updateAvatar: function(url){
      var _this = this
      // 设置avatar
      app.request({
        url: '/api/v1/users/update_avatar', 
        data: {avatar: url},
        method: 'POST',
        success: function(resp){
          if(resp.data.status == 0){
            _this.loadUser()
            wx.showToast({
              icon: 'none',
              title: '头像上传成功！',
              duration: 2000,
            })
          }
        }
      })
  },


  loadUser: function(){
      var _this = this
      auth.getRemoteUserInfo(function(user) {
        _this.setData({ userInfo: user })
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
