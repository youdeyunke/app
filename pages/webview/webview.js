const app = getApp()

Page({
  data: {
  },
  onLoad: function (q) {
    this.setData({
      url: q.url,
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '晓得-小程序开发',
      path: '/pages/webview/webview?url=' + this.data.url,
    }
  },
})
