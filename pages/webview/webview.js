const app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');


Page({
  data: {
  },

  onLoad: function (q) {
    var url = wx.getStorageSync('webview')
    var title = q.title
    if(!url){
      wx.showToast({
        title: '跳转失败,url不能为空',
      }) 
    }

    console.log('url', url)
    
    this.setData({
      url: url,
      title: title,
    })

    var _this = this
    var html = ''

    wx.request({
      url: url,
      success: function(resp){  
        var reg = /<p.*?>.*?<\/p>/g
        while(true){
          var s = reg.exec(resp.data)
          if(!s){
            break
          }else{
            var t = s[0].replace(/(data-src)/g, 'src')
            html += t
          }
        }
        console.log('html ', html)
        WxParse.wxParse('htmlContent', 'html', html, _this, 5);
      },
    })
    //wx.setStorageSync('webview', null)
  },

  onShareAppMessage: function (res) {
    return {
      title: '晓得-小程序开发',
      path: '/pages/webview/webview?url=' + this.data.url,
    }
  },
})
