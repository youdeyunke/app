const app = getApp()


Page({
  data: {
  },

  onShow: function(){
    var url = wx.getStorageSync('webview')
    this.setData({url: url})
  },

  onLoad: function (q) {
  },

})
