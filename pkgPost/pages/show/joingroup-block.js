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
    show:false,
    number:0
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
  onqrshow(){
    this.setData({
      show: true
  });
  },
  getsaveImage(){
    this.__wxSetting()
  },
  __wxSetting() {
    let that = this;
    wx.getSetting({
      success(res){
        if(!res.authSetting['scope.writePhotosAlbum']){
    wx.showModal({
      content:"你没有打开保存图片权限，是否去设置打开？",
      confirmText:"确定",
      cancelText:"取消",
      success:function(res){
        if(res.confirm){
        wx.openSetting({
          success(res){
            if(res.authSetting['scope.writePhotosAlbum']){ 
              that.qrhandle()
            }
            else{
              wx.showToast({
                title: '您没有授权'
              })
              that.setData({

              })
            }
          }
      })
      }
    }
    })
  }else{
    that.qrhandle()
  }
}
  })
},
    qrhandle(){
      var code = this.data.value.qr
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
