// pages/qa/new.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  gohome: function(e){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  inputHandle: function (e) {
    var v = e.detail.value
    this.setData({ questionContent: v })
  },


  resetHandle: function(){
    wx.navigateBack({ delta: -1 })
  },

  submitHandle: function () {
    var _this = this
    var content = _this.data.questionContent
    var qLen = typeof content == 'undefined' ? 0 :  content.length 
    var qMinLength = 10

    if (qLen >= 200) {
      wx.showToast({
        title: '文本太长',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (qLen <= qMinLength) {
      wx.showToast({
        title: '请至少填写' + qMinLength + '个字符',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    app.ensureUser(function(userInfo){
        _this.doSubmit()
    })
  },

  doSubmit: function () {
    var _this = this
    var content = _this.data.questionContent
    // 保存到本地，用户跳转到登录后，文本不丢失
    wx.setStorageSync('question_content', content)

    app.request({
      method: 'POST',
      url: '/api/v1/questions/',
      data: { content: content, post_id: _this.data.post_id},
      success: function (resp) {
        // clear cache
        _this.setData({ questionContent: '' })
        wx.setStorageSync('question_content', '')
        // redirect
        wx.navigateBack({
          delta: -1
        })
        
        wx.showToast({
          title: '问题提交成功，我们会尽快回复您',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({post_id: q.post_id})
    var _this = this
    var eb = {
      key: 'redirect',
      value: '/pages/qa/new'
    }
    app.setLoginBack(eb)
    app.ensureMobile(function(userInfo){
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
