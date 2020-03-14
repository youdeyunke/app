const app = getApp()

Page({
    data: { url: '' },

    onLoad: function (q) {
        console.log('url 0 is', q.url)
        var url = decodeURIComponent(q.url)
        this.setData({
            url: url,
            sourceUrl: q.url
        })
        this.setData({ title: q.title })
    },

    onShow: function () {
        console.log('on show')
    },


    onShareAppMessage: function () {
        var _this = this
        var path = 'pages/webview/webview?url=' + this.data.sourceUrl
        return {
            title: _this.data.title || '',
            path: path
        }
    },


})
