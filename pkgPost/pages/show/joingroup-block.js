// pkgPost/pages/show/joingroup-block.js
var app = getApp()
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
    onQrShow(){
      this.setData({
        show: true
    });
    },
    getSaveImage(){
      app.downloadImage(this.data.value.qr)
    }
  }
})
