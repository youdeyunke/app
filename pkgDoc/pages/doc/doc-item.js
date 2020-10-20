// pkgDoc/pages/doc/doc-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{type:Object}
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
    openDocument(){
      var _this = this
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: _this.data.item.url,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType:_this.data.item.file_type,
          })
        }
      })
    },
  }
})
