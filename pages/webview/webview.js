const app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');


Page({
  data: {
  },

  onLoad: function (q) {
    var url = q.url 
    console.log('url', url)
    this.setData({ url: url, })
  },

})
