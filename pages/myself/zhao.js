// pages/myself/zhao.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo'),

    budget: '',
    purpose: '',
    position: '',
    contact: '',

    purposeList: [
      {name: '采光好'},
      {name: '繁华地段'},
      {name: '配套成熟'},
      {name: '交通便利'},
      {name: '南北通透'},
      {name: '小区优质位置'},
      { name: '刚需'},
      { name: '结婚'},
      {name: '投资'},
      {name: '给父母住'},
      {name: '孩子上学'},
      {name: '改善条件'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var _this  = this
    var eb = {
        key: 'switch',
        value: '/pages/myself/zhao',
    }
    app.setLoginBack()
  },

  getFormData: function(){
    var data = {}
  },

  validate: function(cb){
    if(!this.data.purpose){
      wx.showToast({
        title: '请选择标签',
        icon: 'none'
      })
      return
    }
    if(!this.data.position){
      wx.showToast({
        title: '请填写区域',
        icon: 'none'
      })
      return
    }


    var data = {
      budget: this.data.budget,
      purpose: this.data.purpose,
      position: this.data.position,
    }
    return cb(data)
  },

  submitHandle: function(e){
    var _this = this
    app.uploadFormId(e)
    auth.ensureMobile(function(userInfo){
        _this.validate(function(data) {
          app.request({
            url: '/api/v1/needs',
            data: data,
            method: 'POST',
            success: function(resp){
              if(resp.data.status != 0){
                wx.showToast({
                  title: '服务器出现错误，请稍后再试',
                  icon: 'fail',
                })
                return false
              }
              wx.showModal({
                title: '提交成功！',
                content: '经济人稍后将与您取得联系，请留意',
              })

              wx.navigateBack({
                delta: -1
              })

            }
          })
        })
      })

  },

  positionHandle: function(e){
    this.setData({ position:    e.detail.value})
  },

  budgetHandle: function(e){
    console.log('budget', e.detail.value)
    this.setData({ budget: e.detail.value })    
  },

  contactHandle: function(e){
    this.setData({ contact: e.detail.value })    
  },

  purposeHandle: function(e){
    var i = e.currentTarget.dataset.index
    var ps = this.data.purposeList
    var p = ps[i]
    var purpose = []

    p.selected = !p.selected
    ps[i] = p
    this.data.purposeList.forEach(function(item, i){
      console.log('item', item)
      if(item.selected){
        purpose.push(item.name)
      }
    })


    this.setData({ purposeList:ps, purpose: purpose.join(',') })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title:  "定制找房",
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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
