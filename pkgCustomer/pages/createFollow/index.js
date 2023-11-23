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
// pkgCustomer/pages/createFollow/index.js
import Notify from '../../../vant/notify/notify';
const app = getApp()
const clueApi = require("../../../api/clue")
const followApi = require("../../../api/follow")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: null,
    content: '',
    statusItems: [

    ],

    clueId: null,
    statusId: null,
    target_id: null,
    target_type: null,
  },


  loadData: function () {
    var _this = this
    clueApi.getClueStatusList().then((resp) => {
      if (resp.data.status != 0) {
        return
      }
      _this.setData({
        statusItems: resp.data.data,
      })
    })
  },


  contentHandle: function (e) {
    var c = e.detail.value
    this.setData({
      content: c
    })
  },

  itemClick: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    var item = this.data.statusItems[index]
    console.log('index', index, 'item', item)
    this.setData({
      statusId: item.id
    })

  },

  submitHandle: function (e) {
    if (this.data.loading) {
      return
    }

    // validate
    var content = this.data.content
    if (!content || content.length < 5) {
      Notify({
        message: '请填写跟进日志详细内容，不少于5个字',
        type: 'danger'
      })
      return false
    }

    if (!this.data.statusId) {
      Notify({
        message: '请选择一个状态',
        type: 'danger'
      })
      return false
    }
    var data = {
      content: content,
      status_id: this.data.statusId,
      target_id: this.data.target_id,
      target_type: this.data.target_type
    }
    this.setData({
      loading: true
    })
    // app.dingyueHandle()
    var _this = this
    // clueApi.createClueFollow(data).then((resp) => {
    //   if (resp.data.status != 0) {
    //     return false
    //   }
    //   _this.setData({
    //     loading: false
    //   })
    //   app.globalData.backToReload = true

    //   wx.showToast({
    //     title: '日志已提交成功',
    //   })
    //   setTimeout(() => {
    //     wx.navigateBack({
    //       delta: -1,
    //     })
    //   }, 1000)
    // })
    followApi.createCustomerFollow(data).then((resp) => {
      if (resp.data.status != 0) {
        return false
      }
      _this.setData({
        loading: false
      })
      app.globalData.backToReload = true

      wx.showToast({
        title: '日志已提交成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: -1,
        })
      }, 1000)
    })
    wx.showLoading({
      title: '提交中',
    })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    if (q.status_id) {
      var sid = parseInt(q.status_id)
    }
    this.setData({
      // clueId: q.id,
      statusId: sid,
      target_id: q.target_id,
      target_type: q.target_type
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})