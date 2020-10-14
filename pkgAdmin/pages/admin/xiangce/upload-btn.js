// pkgAdmin/pages/admin/xiangce/upload-btn.js
var qiniu = require('../../../../utils/qiniu.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max: {type: Number, value: 15},
    images:{type:Array}
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
    doUpload: function(ftype, paths){
      wx.setKeepScreenOn({ keepScreenOn: true })          
      wx.showLoading({title: "上传中,请勿关闭", mask: true})
      var _this = this
      var path = paths.shift()
      qiniu.upload(path, function(url){
            if(ftype == 'images'){
              var urls = _this.data.images
              urls.push(url)
              _this.triggerEvent('change', { images: urls, cover_index: _this.data.cover })
            }
            if(ftype == 'video'){
              _this.triggerEvent('change', {video: url })
            }
          
            if(paths.length > 0){
              _this.doUpload('images', paths)
            }
            // 上传完
            if(paths.length == 0){
              setTimeout(function(){  
                  wx.hideLoading() 
                  wx.showToast({
                  title: '上传完成!',
                    icon: 'success',
                  })      

              }, 1000) }
      })
  },
  chooseImages: function(e){
    var that = this
    console.log('images count',that.data.max - that.data.images.length )
    wx.chooseImage({
      count: that.data.max - that.data.images.length,
      sizeType: ['original', 'compressed'],

      success (res) {
        const paths = res.tempFilePaths
        that.doUpload('images', paths)
      }
  })
},
  }
})
