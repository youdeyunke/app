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
    showFile(){
      wx.showLoading({title: '加载中',mask:'true'})
      var _this = this
      wx.getStorage({
        key: "doc."+_this.data.item.id,
        success (res) {
          wx.openDocument({
            filePath: res.data,
            fileType:_this.data.item.file_type,
            success(){
              wx.hideLoading()
            }
          })
        },
        fail(){
          _this.downloadFile()
        }
      })
    },
    downloadFile(){
      var _this = this
      wx.downloadFile({
        url: _this.data.item.url,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.setStorage({
            key:"doc."+_this.data.item.id,
            data:filePath
          })
          wx.openDocument({
            filePath: filePath,
            fileType:_this.data.item.file_type,
            success(){
              wx.hideLoading()
            }
          })
        }
      })
    },

  }
})
