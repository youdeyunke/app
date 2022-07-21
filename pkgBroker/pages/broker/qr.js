const app = getApp()
import Poster from '../../utils/poster/poster';
var userAvatar = {
    type: 'image',
    url: '',
    css: {
      width: '180rpx',
      height: '190rpx',
      top: '160rpx',
      left: '120rpx',
      borderRadius: '95rpx'
    },
}
var userName = {
    type: 'text',
    text: "",
    css: {
        width: '290rpx',
        height: '64rpx',
        fontSize: "48rpx",
        top: "185rpx",
        left: "330rpx",
        color: "#3E290C"
    }
}
var userMobile = {
    type: 'text',
    text: "",
    css: {
        width: '290rpx',
        height: '40rpx',
        fontSize: "30rpx",
        top: "250rpx",
        left: "330rpx",
        color: "#3E290C"
    }
}
var userGroupName = {
    type: 'text',
    text: "置业顾问",
    css: {
        width: '290rpx',
        height: '64rpx',
        fontSize: "28rpx",
        top: "296rpx",
        left: "330rpx",
        color: "#3E290C"
    }
}
var userDesc = {
    type: 'text',
    text: "",
    css: {
        width: '480rpx',
        height: '84rpx',
        fontSize: "32rpx",
        top: "435rpx",
        left: "135rpx",
        color: "#3E290C",
        lineHeight: "36rpx",
        maxLines: 2
    }
}
var userQr = {
    type: 'image',
    url: '',
    css: {
        width: '203rpx',
        height: '203rpx',
        bottom: '271rpx',
        left: '275rpx',
        borderRadius: '72rpx',
    },
}
var tip = {
    type: 'text',
    text: "长按识别二维码查看我的主页",
    css: {
        width: '196rpx',
        height: '74rpx',
        fontSize: "28rpx",
        bottom: "150rpx",
        left: "277rpx",
        color: "#3E290C",
        lineHeight: "34rpx",
        textAlign: "center"
    }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    userInfo: {},

    posterUrl: "",
    palette:{}
  },

  genUserCard(){
    var userInfo = app.globalData.userInfo 
    var palette = {
        background: 'https://qiniucdn.udeve.cn/fang2021/8e160ce1-6eb7-48d4-969c-e8f08ac12f05.jpg',
        width: '750rpx',
        height: '1110rpx',
        views: [],
    }
    userAvatar.url = userInfo.avatar
    userName.text = userInfo.name
    userMobile.text = userInfo.mobile
    userDesc.text = userInfo.desc
    userQr.url = userInfo.qr
    if (userInfo.group_name != null) {
        userGroupName.text = userInfo.group_name
    }
    var views = [userAvatar, userName, userMobile, userDesc, userQr, tip, userGroupName]
    palette.views = views
    this.setData({  palette: palette })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.genUserCard()
    wx.showLoading({
        title: '加载中',
    })
    setTimeout(function () {
        wx.hideLoading()
    }, 800)
  },

  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
        posterUrl: this.imagePath,
    });
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