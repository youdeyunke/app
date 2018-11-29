// components/images-uploader.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images:{type: Array, value: []},
    video: {type:String, value: ''},
    max: {type: Number, value: 15},
    min: {type: Number, value: 3},
    cover: {type: Number, value: 0},
    enableVideo: {type: Boolean, value: false},
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 本地路径
    currentIndex: -1,
    files: [],
    urls: [],
    showSheet: false,
    sheetActions: [
      {key: 'setcover', name: '设为主图'}, 
      {key: 'delete', name: '删除'}, 
      {key: 'cancle', name: '取消'}],

  },

  ready: function(){
    console.log('data', this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTouch: function(e){
      // 点击了一张图片
      var i = e.currentTarget.dataset.index
      this.setData({showSheet: true, currentIndex: i})
    },
    onSheetClose: function(e){
      this.setData({showSheet: false})
    },

    onSheetSelect: function(e){
      var _this = this
      console.log('sheet select ', e)
      var key = e.detail.key
      switch(key){
        case 'cancle':
          _this.onSheetClose()
          break;
        case 'setcover':
          _this.setCover()
          break;
        case 'delete':
          _this.deleteImage()
          break;
      }
      _this.onSheetClose()
    },

    setCover: function(){
      this.triggerEvent('change', {cover_index: this.data.currentIndex})
    },

    deleteImage: function(){
      var i = this.data.currentIndex
      var c = this.data.cover
      console.log('i', i, 'c', c, i < c)

      // 删除主图左边的, c -1
      if(i < c){
        wx.showToast({title: 'c--'})
        c = c -1
      }

      // 如果被删除的这张图片是主图，不能删除
      if(i == this.data.cover){
        wx.showToast({
          title: '不能删除主图',
          icon: 'none',
        })
        return false
      }

      var imgs =  this.data.images
      imgs.splice(i, 1)
      this.triggerEvent('change', {images: imgs, cover_index: c})
    },

    doUpload: function(ftype, paths){
      wx.showLoading({title: "正在上传", mask: true})
      var _this = this
      var host = app.globalData.apiHost
      var path = paths.pop()
      //var uri = ftype == 'images' ? '/api/v1/uploader/' : '/api/v2/videostore/'
      var uri = '/api/v1/uploader/'

      console.log('start upload image', path)

      wx.uploadFile({
          url: host + uri, //仅为示例，非真实的接口地址
          filePath: path,
          name: 'file',
          formData: {
            'user': 'test'
          },

          fail: function(e){
          }, 
          success (res){
            if(res.statusCode != 200){
              wx.showToast({title: '上传失败', icon: 'fail'})
              return false
            }
            const url = res.data
            if(ftype == 'images'){
              var urls = _this.data.images
              urls.push(url)
              _this.triggerEvent('change', { images: urls, cover_index: _this.data.cover })
            }else{
              _this.triggerEvent('change', {video: url })
            }
          },
          
          complete: function(res){
            wx.hideLoading()
            if(paths.length > 0){
              _this.doUpload('images', paths)
            }
          },
      })
  },

    chooseVideo: function(e){
      var _this = this
      console.log('click', e)
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed: true,
        maxDuration: 60,
        camera: 'back',
        fail: function(res){
          console.log('fail', res)
        },

        complete: function(res){
          console.log('complete', res)
        },
        
        success: function(res) {
          console.log(res.tempFilePath)
          const paths = [res.tempFilePath]
          _this.doUpload('video', paths)
        }
      })

    },

    videoClick: function(e){
      var _this = this
      wx.showModal({
        title: '操作提示',
        content: '要删除视频吗？',
        confirmText: '删除',
        confirmColor: '#ff0000',
        success: function(res){
          if(res.confirm){
            _this.setData({video: ''})
            _this.triggerEvent('change', {video: ''})
          }
        },
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
