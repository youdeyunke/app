// pages/myself/myself.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },


  loginHandle: function(e){
    var _this = this
    console.log('uinfo', e)
    if (e.detail.errMsg != 'getUserInfo:ok'){
      console.error('授权时候出错', e)
      return
    }

    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
  
    // 获取code
    wx.login({
      success: function(res){
        if(res.code){
          // 换取服务器的token
          _this.getSessionToken(res.code, encryptedData, iv, function(userInfo){
            // success
            _this.setData({userInfo: userInfo})

            // event bus
            var eb = wx.getStorageSync('loginEventBus')
            if(eb){
              // clear
              wx.setStorageSync('loginEventBus', null)
              var k = eb.key
              var v = eb.value
              if(k == 'switchTab'){
                wx.switchTab({
                  url: v
                })
              }
              if(k == 'navigateBack'){
                wx.navigateBack({
                  delta: v
                })
              }
            }
          })
        }
      },
      complete: function (res) {
        // 用户拒绝,跳转到设置界面
        if (res.errMsg == 'getUserInfo:fail auth deny') {
          wx.openSetting({})
        }
      }
    })
  },


  getSessionToken: function(code, encryptedData, iv, cb){
    // 重新获取token，并刷新 user info
    var _this = this

    // 发送给服务器
    app.request({
      data: { 
        code: code, 
        encryptedData: encryptedData, 
        iv: iv
      },

      method: 'POST',
      url: '/api/v1/sessions',
      success: function (resp) {
        var data = resp.data
        if (data.status == 0) {
          var token = data.data.token
          var userInfo = data.data.user
          // 保存下服务器返回的token
          wx.setStorageSync('token', token)
          wx.setStorageSync('userInfo', userInfo)
          // upload formids
          app.uploadFormId()
          return cb(userInfo)
        }
      }
    });    
  },  


  aboutHandle: function(e){
    wx.showToast({
      title: '了解更多，请访问家的要素官网：http://www.jiayaosu.com',
      icon:'none'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(this.data.userInfo)
  
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