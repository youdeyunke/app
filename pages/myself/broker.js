// pages/myself/broker.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply: {},
    steps: [
      '提交资料',
      '开通会员',
      '发布房源',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    auth.ensureUser(function(userInfo){
      _this.loadUserApply()
      app.request({
        url: '/api/v1/users/' + userInfo.id,
        success: function(resp){
          if(resp.data.status == 0){
            _this.setData({
              userInfo: resp.data.data
            })
          }
        },
      })
    })
  },

  loadUserApply: function(){
    // 加载历史提交的资料
    var _this = this
    app.request({
      url: "/api/v2/broker_applies/myself",
      success: function(resp){
        if(resp.data.status == 0){
          _this.setData({
            apply: resp.data.data
          })
        }
      }
    })
  },


  validate: function(data, cb){
    if(!data.name){
      wx.showToast({
        icon: 'none',
        title: '姓名不能为空',
      })
      return false
    }
    if(!data.mobile && !data.wechat){
      wx.showToast({
        title: '手机号和微信号至少填写一个',
      })
      return false
    }

    return cb(data)

  },

  doPost: function(data){
    var _this = this
    app.request({
      url: '/api/v2/broker_applies',
      data: {broker: data},
      method: "post",
      success: function(resp){
        if(resp.data.status  == 0){
          var apply = resp.data.data
          /* 资料提交成功，
          如果没有选择套餐，进入套餐选择界
          */
          wx.navigateTo({
            url: '/pages/broker/membership',
          })
        }
      },
    })
  },

  submitHandle: function(e){
    var _this = this
    var data = e.detail.value
    this.validate(data, (vdata) => {
      _this.doPost(vdata)
    })
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
