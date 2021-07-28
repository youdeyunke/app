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
    
    var path = '/pkgBroker/pages/broker/profile?id=' + userInfo.id 
    var qrdata = {referrer_id: userInfo.id}
    app.genQr(path, qrdata, (data) => {
      var url = data.url  
      this.setData({
        userInfo: userInfo, 
        qrUrl: url, 
      }, () => { 
        this.onCreatePoster() 
      })

    })

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
      url: '/pages/myself/profile'
    })
  },
  onCreatePoster() {
    wx.showLoading({
      title: '制作海报中...',
      mask: true,
    });
    this.setData({
      loading: true
    })
    var _this = this
    var bgImg = '../../images/poster-bg.jpg'

    var desc = ''
    if (this.data.userInfo.desc) {
      desc = this.data.userInfo.desc
    }
    var name = '未知'
    if (this.data.userInfo.name) {
      name = this.data.userInfo.name
    }
    var companyName = '暂无'
    if (this.data.userInfo.company) {
      var companyName = this.data.userInfo.company.name
    }
    var config = {
      debug: false,
      width: 750,
      height: 1110,
      images: [{
          width: 750,
          height: 1110,
          x: 0,
          y: 0,
          url: bgImg,
          zIndex: 0,
        },

        {
          width: 203,
          height: 203,
          x: 275,
          y: 636,
          url: _this.data.qrUrl,
          zIndex: 21
        },
      ],
      texts: [{
          x: 327,
          y: 200,
          fontSize: 46,
          color: '#3E290C',
          baseLine: 'top',
          fontWeight: 'bold',
          text: name
        },
        {
          x: 327,
          y: 266,
          fontSize: 30,
          color: '#3E290C',
          baseLine: "top",
          text: _this.data.userInfo.mobile
        },
        {
          x: 327,
          y: 311,
          fontSize: 28,
          color: '#3E290C',
          baseLine: 'top',
          text: companyName
        },
        {
          x: 135,
          y: 460,
          width: 480,
          fontSize: 32,
          color: '#3E290C',
          lineNum: 2,
          lineHeight: 42,
          text: desc
        },


      ],
      blocks: [{
        x: 264,
        y: 625,
        width: 224,
        height: 224,
        backgroundColor: '#fff',
        borderRadius: 41,
        zIndex: 20
      }]
    }
    if(this.data.userInfo.avatar){
      config.images.push(
        {
          width: 178,
          height: 189,
          x: 119,
          y: 159,
          url: _this.data.userInfo.avatar,
          borderRadius: 178,
          zIndex: 19
        },
      )
    }
    this.setData({
      posterConfig: config
    }, () => {
      console.log('config info', config)
      Poster.create(true)
    })
  },
  onPosterSuccess: function (e) {
    console.log('on poster success', e)
    var _this = this
    var posterUrl = e.detail
    this.setData({
      posterUrl: posterUrl,
    })
    setTimeout(function () {
      wx.hideLoading();
      _this.setData({
        loading: false
      })
      wx.showToast({
        title: '已生成',
        icon: 'success',
        image: '',
        duration: 1000,
        mask: false,
      });

    }, 1000)
  },
  onPosterFail: function (e) {
    console.log('生成海报失败', e)
    wx.hideLoading();
    this.setData({
      loading: false
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