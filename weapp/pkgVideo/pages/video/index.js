/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: www.youdeyunke.com
 * +----------------------------------------------------------------------
 */
// pkgVideo/pages/video/index.js
const app = getApp()
const videoApi = require("../../../api/video")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    page: 1,
    items: [],
    showVideo: false,
    videoUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    app.ensureConfigs((myconfigs) => {

      var bgColor = myconfigs.color.primary || '#F0F0F0'
      var fontColor = '#ffffff'
        wx.setNavigationBarColor({
          backgroundColor: bgColor,
          frontColor: fontColor,
        })
        _this.setData({
            btnColor: myconfigs.color.primary_btn,
            primaryColor: myconfigs.color.primary,
        })
    })
    this.loadData()
  },

  closeVideoPopup() {
    this.setData({
      showVideo: false,
      videoUrl: ''
    })
  },

  videoHandle(e) {
    var video = e.currentTarget.dataset.video
    videoApi.addVideoViews(video.id)

    if (video.is_wxvideo) {
      wx.openChannelsActivity({
        finderUserName: video.wxauthor_id,
        feedId: video.wxvideo_id,

      })
    } else {
      wx.navigateTo({
        url: '/pkgVideo/pages/show/index?id=' + video.id,
      })
    }

  },

  clearHandle() {
    this.setData({
      kw: '',
    })
  },

  kwChange: function (e) {
    var kw = this.data.kw
    this.search(kw)
  },

  search: function (kw) {
    this.setData({
      kw: kw,
      page: 1,
      items: []

    }, () => {
      this.loadData()
    })
  },

  loadData() {
    var _this = this
    var data = {
      kw: this.data.kw,
      page: this.data.page,
      per_page: 8,
    }
    videoApi.getVideoList(data).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      var items = _this.data.items
      _this.setData({
        items: items.concat(resp.data.data)
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    var _this = this
    this.setData({
      page: _this.data.page + 1
    }, () => {
      _this.loadData()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      title: '视频看房',
      path: '/pkgVideo/pages/video/index'
    }
  }
})