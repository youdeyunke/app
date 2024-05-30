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
// pkgFeedback/pages/Feedback/index.js
const feedbackApi = require("../../../api/feedback")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cats: ['页面报错','数据缺失、错误','功能建议','其他'],
    currentCat: '',
    primaryColor: '#1989fa',
    primaryBtnColor: '#1989fa',
    content: '',
    images: '',
    phone: '',
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    app.ensureConfigs((myconfigs) => {
        _this.setData({
            primaryColor: myconfigs.color.primary,
            primaryBtnColor: myconfigs.color.primary_btn,
        })
        wx.setNavigationBarColor({
          backgroundColor: myconfigs.color.primary,
          frontColor: '#ffffff',
        })
    })
  },

  submitHandle(){
    var _this = this
    var key = 'visitorUid'
    var uid = wx.getStorageSync(key)
    var data = {
      uid: uid,
      feedback_type: this.data.currentCat,
      content: this.data.content,
      images: this.data.images,
      contact: this.data.phone,
    }
    if(!data.feedback_type){
      wx.showToast({
        title: '请选择反馈类型',
        icon: 'none'
      })
      return
    }
    if(!data.content){
      wx.showToast({
        title: '请输入反馈类型描述',
        icon: 'none'
      })
      return
    }
    this.setData({
      loading: true
    })
    feedbackApi.createFeedback(data).then((resp) => {
      _this.setData({
        loading: false
      })
      if(resp.data.code != 0){
        return
      }
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    })
  },

  catHandle(e){
    this.setData({
      currentCat: e.currentTarget.dataset.cat
    })
  },

  imagesHandle: function (image) {
    console.log(image);
    var imagesjoin = image.detail.value.map(function (obj) {
        return obj.url;
    }).join(",");
    this.setData({
        images: imagesjoin
    })
  },

  contentInput(e){
    // console.log(e);
    this.setData({
      content: e.detail.value
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})