// pages/post/simple-images-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value: {type: Object },

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
    viewImage: function (e) {
        var urls = this.data.value.full_images
        var url = urls[0]
        wx.previewImage({
            current: url,
            urls: urls,
        })
    },

  }
})
