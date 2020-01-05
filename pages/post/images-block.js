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
        wx.setStorageSync('video-url', this.data.post.video)
        wx.navigateTo({ url: '/pages/video/show' })
    },

    gotoVr: function () {
        var vr = this.data.post.proxy_vr_url
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
