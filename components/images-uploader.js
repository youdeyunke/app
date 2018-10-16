// components/images-uploader.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images:{type: Array, value: []},
    max: {type: Number, value: 10},
    min: {type: Number, value: 3},
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 本地路径
    files: [],
    urls: [],

  },

  /**
   * 组件的方法列表
   */
  methods: {
    doUpload: function(paths){
      var _this = this
      var host = app.globalData.apiHost
      var path = paths.pop()
      console.log('start upload image', path)

      wx.uploadFile({
          url: host + '/api/v1/uploader/', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'file',
          formData: {
            'user': 'test'
          },

          fail: function(e){
            wx.hideLoading();
            wx.showModal({title: '失败', content: '上传失败', showCancle: false})
          }, 
          success (res){
            const url = res.data
            var urls = _this.data.images
            urls.push(url)
            console.log('urls', urls)
            _this.triggerEvent('change', {images: urls})
          }
      })
  },

    chooseImages: function(e){
      var that = this
      wx.chooseImage({
        success (res) {
          const paths = res.tempFilePaths
          that.doUpload(paths)
        }
    })
  },

  }
})
