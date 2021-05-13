// pkgPost/pages/show/joingroup-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:Object,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
          show: false
      });
  },
  onshow(){
    this.setData({
      show: true
  });
  },
    qrhandle(){
      var code = this.data.value.qr
      console.log("二维码路径:", this.data.value.qr)
      if (code == null) {
          wx.showToast({
              title: '对方还没有上传二维码',
              icon: 'none'
          })
      } else {
          wx.downloadFile({
              url: code,
              success(res) {
                  wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,
                      success(res) {
                          wx.showToast({
                              title: '保存二维码成功',
                          })
                      }
                  })
              }
          })
      }
    }
  }
})
