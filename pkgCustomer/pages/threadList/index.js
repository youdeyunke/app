/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: UDEVE Team <tech@udeve.cn>
 * +----------------------------------------------------------------------
 */
// pkgCustomer/pages/threadList/index.js
const app = getApp()
const threadApi = require("../../../api/thread")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    type: 'private',
    page: 1,
    items: []
  },

  kwSearch(e) {
    var _this = this
    this.setData({
      kw: e.detail,
      items: [],
      page: 1
    },() => {
      _this.loadData()
    })
  },

  kwClear() {
    var _this = this
    this.setData({
      kw: '',
      items: [],
      page: 1
    },() => {
      _this.loadData()
    })
  },

  linquThread(e) {
    var _this =this
    var threadId = e.currentTarget.dataset.threadid
    console.log(e,threadId);
    wx.showModal({
      title: '是否领取该线索',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          threadApi.recieveThreads(threadId).then((resp) => {
            if (resp.data.code != 0) {
              return
            }
            wx.showToast({
              title: '领取成功',
              icon: 'none'
            })
            this.setData({
              items: [],
              page: 1
            },() => {
              _this.loadData()
            })
          })
        }
      }
    })
  },

  loadData() {
    var _this = this
    var data = {}
    if (this.data.type == "private" || this.data.type == "public") {
      data = {
        page: this.data.page,
        per_page: 15,
        type: this.data.type,
      }
    } else {
      data = {
        ids: this.data.ids
      }
    }
    if (this.data.kw) {
      data.kw = this.data.kw
    }
    threadApi.getThreadList(data).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      var arr = _this.data.items
      var resarr = arr.concat(resp.data.data)
      _this.setData({
        items: resarr
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    var _this = this
    console.log(e);
    this.setData(
      e, () => {
        if (_this.data.type == "private") {
          wx.setNavigationBarTitle({
            title: '我的线索',
          })
        }
        if (_this.data.type == "public") {
          wx.setNavigationBarTitle({
            title: '公海线索',
          })
        }
        if (_this.data.type == "recycle") {
          wx.setNavigationBarTitle({
            title: '将回收线索',
          })
        }
        if (_this.data.type == "follow-up") {
          wx.setNavigationBarTitle({
            title: '待跟进线索',
          })
        }
        _this.loadData()
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
    var _this = this
    this.setData({
      kw: '',
      items: [],
      page: 1
    },() => {
      _this.loadData()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    var _this = this
    var page = this.data.page
    this.setData({
      page: page + 1
    },() => {
      _this.loadData()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})