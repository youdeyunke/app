// pages/qa/new.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      loading: false,
      qid: '',
      content: '',
      minLength: 5,
      maxLength: 300,
  },

  inputHandle: function (e) {
    var v = e.detail.value
    this.setData({ content: v })
  },

  resetHandle: function(){
    wx.navigateBack({ delta: -1 })
  },

  submitHandle: function (e) {
    if(this.data.loading){
        return false;
    }
      
    var _this = this
    var content = _this.data.content
    var qLen = typeof content == 'undefined' ? 0 :  content.length 
    var min = this.data.minLength 
    var max = this.data.maxLnegth

    if (qLen > max) {
      wx.showToast({
        title: '内容太长',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (qLen < min) {
      wx.showToast({
        title: '请至少填写' + min+ '个字符',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.setData({loading: true})
    auth.ensureUser(function(userInfo){
        _this.doSubmit()
    })
  },

  backHandle: function(){
      wx.navigateBack({delta: -1})
  },

  doSubmit: function () {
    var _this = this
    var content = _this.data.content
	app.request({
	    url: '/api/v1/answers',
	    method: 'POST',
	    data: {
		question_id: _this.data.qid,
		content: content,
	    },
	    success: function (resp) {
		_this.setData({ loading: false })
		if (resp.data.status == 0) {
            wx.showToast({
              title: '已回答',
              icon: 'success',
              mask: true,
              duration: 1500,
              success: function(){
                setTimeout(function(){
                    wx.navigateBack({ delta: -1 })
                }, 1500)
              },
            })
		}
	    }
	})
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({qid: q.qid})
    var _this = this
    auth.ensureUser(function(userInfo){
        _this.setData({userInfo: userInfo})
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
