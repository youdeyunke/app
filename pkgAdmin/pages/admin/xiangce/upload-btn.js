// pkgAdmin/pages/admin/xiangce/upload-btn.js
const app = getApp()
var qiniu = require('../../../../utils/qiniu.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max: {type: Number, value: 15},
    images:{type:Array},
    mediaid:{type:Number}
  },

  /**
   * 组件的初始数据
   */
  data: {
    types:null,
    files:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    doUpload: function(paths){
      wx.setKeepScreenOn({ keepScreenOn: true })          
      wx.showLoading({title: "上传中,请勿关闭", mask: true})
      var _this = this
      var path = paths.shift()
      qiniu.upload(path, function(url){
              _this.insertPath(url)
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
    wx.chooseImage({
      count: that.data.max - that.data.images.length,
      sizeType: ['original', 'compressed'],
      success (res) {
        const paths = res.tempFilePaths
        that.setData({
          types:'image'
        })
        that.doUpload(paths)
      }
  })
},
  insertPath(url){
    var _this =  this
    var id  =this.data.mediaid
    var type = this.data.types
    app.request({
      url:'/api/v1/media_items/',
      method:'POST',
      data:{
        file_type: type,
        url:url,
        media_cat_id:id
      },
      success:function(res){
        _this.triggerEvent('change')
      }
    })
  }
  }
})
