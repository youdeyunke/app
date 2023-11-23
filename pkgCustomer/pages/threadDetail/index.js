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
// pkgCustomer/pages/threadDetail/index.js
const app = getApp()
const threadApi = require("../../../api/thread")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thread: {},
    id: null,
    show: false,
    recover_reason: '',
  },

  loadThread(threadid){
    var _this = this
    threadApi.getThreads(threadid).then((resp) => {
      if (resp.data.code != 0) {
        return
      }
      this.setData({
        thread: resp.data.data
      })
    })
  },

  releaseThread(){
    var _this = this
    var id = this.data.id
    wx.showModal({
      title: '是否将线索放回公海',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          _this.setData({
            show: true
          })
        }
      }
    })
  },

  reasonDialogClose(e){
    var _this = this
    var id = this.data.id
    var data = {
      recover_reason: this.data.recover_reason
    }
    if (e.detail == "confirm") {
      threadApi.releaseThreads(id, data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        wx.showToast({
          title: '线索已放回公海',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      })
    }
  },

  threadToCustomer(){
    var id = this.data.id
    wx.showModal({
      title: '确定将线索转为客户吗？',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          threadApi.threadToCustomer(id).then((resp) => {
            if (resp.data.code != 0) {
              return
            }
            wx.navigateTo({
              url: '/pkgCustomer/pages/customerDetail/index?id=' + resp.data.data,
            })
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(q) {
    var threadid = q.id
    this.setData({
      id: threadid
    })
    this.loadThread(threadid)
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