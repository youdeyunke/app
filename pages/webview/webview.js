const app = getApp()


Page({
  data: {
  },

  onShow: function(){
    var url = app.globalData.webviewUrl || wx.getStorageSync('webview')
    this.setData({url: url})
  },

  onLoad: function (q) {
  },

})
