const app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');


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
