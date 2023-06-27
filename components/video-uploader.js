// components/images-uploader.js
const app = getApp()
var qiniu = require('../utils/qiniu.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        images: {
            type: Array,
            value: []
        },
        // video: {type:String, value: ''},
        max: {
            type: Number,
            value: 15
        },
        min: {
            type: Number,
            value: 3
        },
        cover: {
            type: Number,
            value: 0
        },
        enableVideo: {
            type: Boolean,
            value: true
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 本地路径
        currentIndex: -1,
        files: [],
        urls: [],
        video: "",
        showSheet: false,
        sheetActions: [{
                key: 'setcover',
                name: '设为主图'
            },
            {
                key: 'delete',
                name: '删除'
            },
            {
                key: 'cancle',
                name: '取消'
            }
        ],

    },

    ready: function () {
        console.log('data', this.data)
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTouch: function (e) {
            // 点击了一张图片
            var i = e.currentTarget.dataset.index
            this.setData({
                showSheet: true,
                currentIndex: i
            })
        },
        onSheetClose: function (e) {
            this.setData({
                showSheet: false
            })
        },
        onSheetSelect: function (e) {
            var _this = this
            console.log('sheet select ', e)
            var key = e.detail.key
            switch (key) {
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

        setCover: function () {
            var xx = this.data.currentIndex
            this.setData({
                cover: xx
            })
            this.triggerEvent('change', {
                cover_index: this.data.currentIndex
            })
        },

        deleteImage: function () {
            var i = this.data.currentIndex
            var c = this.data.cover
            console.log('i', i, 'c', c, i < c)

            // 删除主图左边的, c -1
            if (i < c) {
                wx.showToast({
                    title: 'c--'
                })
                c = c - 1
            }

            // 如果被删除的这张图片是主图，不能删除
            if (i == this.data.cover) {
                wx.showToast({
                    title: '不能删除主图',
                    icon: 'none',
                })
                return false
            }

            var imgs = this.data.images
            imgs.splice(i, 1)
            this.triggerEvent('change', {
                images: imgs,
                cover_index: c
            })
            this.setData({
                currentIndex: c,
                images: imgs
            })
        },

        doUpload: function (ftype, paths) {
            wx.setKeepScreenOn({
                keepScreenOn: true
            })
            wx.showLoading({
                title: "上传中,请勿关闭",
                mask: true
            })
            var _this = this
            var path = paths.shift()
            qiniu.upload(path, function (url) {
                if (ftype == 'images') {
                    var urls = _this.data.images
                    urls.push(url)
                    _this.setData({
                        images: urls
                    })
                    _this.triggerEvent('change', {
                        images: urls,
                        cover_index: _this.data.cover
                    })
                }
                if (ftype == 'video') {
                    _this.setData({
                        video: url
                    })
                    _this.triggerEvent('change', {
                        video: url
                    })
                }

                if (paths.length > 0) {
                    _this.doUpload('images', paths)
                }
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
            console.log('click', e)
            //wx.showToast({
            //  title: '测试：开启屏幕常亮',
            //  icon: 'none',
            //})      
            wx.chooseMedia({
                count: 9,
                mediaType: ['image', 'video'],
                sourceType: ['album', 'camera'],
                maxDuration: 30,
                camera: 'back',
                success(res) {
                    this.success(res.tempFiles[0].tempFilePath)
                    this.complete(res.tempFiles[0].size)
                },
                complete: function (res) {
                    console.log('complete', res)
                    var size = res.tempFiles[0].size / (1024 * 1024)
                    wx.showModal({
                        title: '文件',
                        content: size.toFixed(2) + 'Mb',
                    })
                },

                success: function (res) {
                    const paths = [res.tempFiles[0].tempFilePath]
                    _this.doUpload('video', paths)
                }
            })

        },


        videoClick: function (e) {
            var _this = this
            wx.showModal({
                title: '操作提示',
                content: '要删除视频吗？',
                confirmText: '删除',
                confirmColor: '#ff0000',
                success: function (res) {
                    if (res.confirm) {
                        _this.setData({
                            video: ''
                        })
                        _this.triggerEvent('change', {
                            video: ''
                        })
                    }
                },
            })
        },


        chooseImages: function (e) {
            var that = this
            console.log('images count', that.data.max - that.data.images.length)
            wx.chooseImage({
                count: that.data.max - that.data.images.length,
                sizeType: ['original', 'compressed'],
                success(res) {
                    const paths = res.tempFilePaths
                    that.doUpload('images', paths)
                }
            })
        },
    }
})