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
// pkgTour/pages/tourList/index.js
const app = getApp()
const tourApi = require("../../../api/tour")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tourItems: [],
    kw: '',
    page: 1,
  },

  kwChange: function (e) {
    var kw = this.data.kw
    this.search(kw)
},

  reloadData: function () {
    this.setData({
      page: 1,
      tourItems: [],
    }, () => {
      this.loadData()
    })
  },

  search: function (kw) {
    console.log('search tour', kw)
    this.setData({
      kw: kw,
      page: 1,
      tourItems: []

    }, () => {
      this.loadData()
    })
  },

  loadMore: function () {
    var page = this.data.page + 1
    this.setData({
      page: page,
    }, () => {
      this.loadData()
    })
  },

  loadData: function () {
    var _this = this
    var query = {
      kw: this.data.kw,
      page: this.data.page,
    }
    tourApi.getTourList(query).then((resp) => {
      if (resp.data.status != 0) {
        return
      }
      if (this.data.page == 1) {
        _this.setData({
          tourItems: resp.data.data
        })
      } else if (this.data.page > 1) {
        var oldData = _this.data.tourItems
        var newData = resp.data.data
        var Data = oldData.concat(newData)
        _this.setData({
          tourItems: Data
        })
      }
      if (_this.data.tourItems.length == 0 && query.page === 1) {
        wx.showToast({
          title: '没有数据',
          icon: 'none',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      path: '/pkgTour/pages/tourList/index',
      title: '全部活动'
    }
  }
})