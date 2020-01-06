// pages/post/images-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {type: Object}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoVideo: function () {
        wx.setStorageSync('video-url', this.data.value.video_url)
        wx.navigateTo({ url: '/pages/video/show' })
    },

    viewImage: function (e) {
        var urls = this.data.value.full_images
        var index = e.currentTarget.dataset.index
        var url = urls[index]
        wx.previewImage({
            current: url,
            urls: urls,
        })
    },

    gotoVr: function () {
        var vr = this.data.value.vr_url
        //var vr = 'https://csimum.udeve.cn/vr.html'
        //var vr = 'https://csimum.udeve.cn/vr2.html?id=21963'
        //var vrid = vr.split('?')[1].split('=')[1]
        //var vr = 'https://csimum.udeve.cn/vr2.html?id=' + vrid  + '&iframe=true'

        if (!vr) {
            return false
        }
        wx.setStorageSync('webview', vr)
        wx.navigateTo({
            url: '/pages/webview/webview',
        })
    },

  }
})
