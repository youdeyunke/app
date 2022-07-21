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
    posterUrl: "",
    palette:{
        background: 'https://qiniucdn.udeve.cn/fang2021/8e160ce1-6eb7-48d4-969c-e8f08ac12f05.jpg',
        width: '750rpx',
        height: '1110rpx',
        views: [
        {
          type: 'image',
          url: '',
          css: {
            width: '180rpx',
            height: '190rpx',
            top: '160rpx',
            left: '120rpx',
            borderRadius: '95rpx'
          },
        },
        {
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
        },
        {
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
        },
        {
            type: 'text',
            text: "特变e享家",
            css: {
                width: '290rpx',
                height: '64rpx',
                fontSize: "28rpx",
                top: "296rpx",
                left: "330rpx",
                color: "#3E290C"
            }
        },
        {
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
        },
        {
            type: 'image',
            url: '',
            css: {
                width: '203rpx',
                height: '203rpx',
                bottom: '271rpx',
                left: '275rpx',
                borderRadius: '72rpx',
            },
        },
        {
            type: 'text',
            text: "长按识别二维码查看我的房源",
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
        },
        ],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var userInfo = app.globalData.userInfo 
    var palette = this.data.palette
    var views = this.data.palette.views
    views[0].url = userInfo.avatar
    views[1].text = userInfo.name
    views[2].text = userInfo.mobile
    views[4].text = userInfo.desc
    views[5].url = userInfo.qr
    palette.views = views
    this.setData({  palette: palette })
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