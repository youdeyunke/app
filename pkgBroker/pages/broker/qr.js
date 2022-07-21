const app = getApp()
import Poster from '../../utils/poster/poster';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    userInfo: {},
    userId: '',
    qrUrl: '',

    posterConfig: {},
    posterUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {

  },

  onShow: function () {
    if(this.data.userInfo && this.data.userInfo.id){
      return
    }
    var userInfo = app.globalData.userInfo  
    if(!userInfo){
      return 
    }

  },

  saveFile() {
    var _this = this
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.posterUrl,
      success() {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
        });
      }
    })
  },
  userEdit() {
    wx.navigateTo({
      url: '/pkgMyself/pages/profile/index'
    })
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