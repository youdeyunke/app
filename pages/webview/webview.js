const app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');


Page({
  data: {
  },

  onLoad: function (q) {
    var url = q.url
    if(q.action == 'vr'){
      url = 'https://www.udeve.cn/vr/3d.html'
    }
    this.setData({ url: url, })
  },

})
