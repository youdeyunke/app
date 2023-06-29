// components/video-uploader/index.js
var qiniu = require('../../utils/qiniu');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    video: "",
  },


  /**
   * 组件的方法列表
   */
  methods: {
    doUpload: function (paths) {
      wx.setKeepScreenOn({
        keepScreenOn: true
      })
      wx.showLoading({
        title: "上传中,请勿关闭",
        mask: true
      })
      var _this = this
      var path = paths.shift()
      console.log("121path",path);
      qiniu.upload(path, function (url) {
        _this.setData({
          video: url
        })
        _this.triggerEvent('change', {
          video: url
        })

        // 上传完
        if (paths.length == 0) {
          setTimeout(function () {
            wx.hideLoading()
            wx.showToast({
              title: '上传完成!',
              icon: 'success',
            })

          }, 1000)
        }
      })
    },

    chooseVideo: function (e) {
      var _this = this
      // 拍摄或从手机相册中选择图片或视频
      wx.chooseMedia({
        count: 9,
        mediaType: ['video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          this.success(res.tempFiles[0].tempFilePath)
          this.complete(res.tempFiles[0].size)
        },
        complete: function (res) {
          var size = res.tempFiles[0].size / (1024 * 1024)
          wx.showModal({
            title: '文件',
            content: size.toFixed(2) + 'Mb',
          })
        },
        success: function (res) {
          const paths = [res.tempFiles[0].tempFilePath]
          _this.doUpload(paths)
        }
      })

    },
  }
})