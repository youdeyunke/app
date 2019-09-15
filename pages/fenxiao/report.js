// pages/owner/sale.js

const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    setpsText: ["报备客户", "客户签约", "佣金到账"],
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
      auth.ensureUser( (user) => {
          // pass
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
    wx.setNavigationBarTitle({
      title: '报备客户',
    })
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  validateFormData: function(fdata){
    if(!fdata['name']){
      wx.showToast({
        title: '请填写客户姓名',
        icon: 'none'
      })
      return false;
    }

    if(!fdata['mobile'] || fdata['mobile'].length != 11){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
      return false;
    }

    if(!fdata['mobile_confirm'] || fdata['mobile_confirm'].length != 11){
      wx.showToast({
        title: '请再次填写确认手机号',
        icon: 'none'
      })
      return false;
    }


    if(fdata['mobile'] != fdata['mobile_confirm'] ){
      wx.showToast({
        title: '两次手机号填写不一致,请检查',
        icon: 'none'
      })
      return false;
    }

    return true
  },

  submit: function(e){
    app.uploadFormid(e)
    var fdata = e.detail.value
    var isok = this.validateFormData(fdata)
    if(!isok){
      return false;
    }

    app.request({
      url: '/api/v1/customers',
      method: 'POST',
      data: {customer: fdata},
      success: function(resp){
        console.log('resp.data', resp.data)
        if(resp.data.status != 0){
          return false;
        }
        wx.showModal({
          title: '报备成功',
          content: '系统已经记录下该客户信息，一旦签约，你将获得相应的佣金',
          success: function(res){
            wx.switchTab({
              url: '/pages/fenxiao/index',
            })
          }
        })
      }
    })
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
