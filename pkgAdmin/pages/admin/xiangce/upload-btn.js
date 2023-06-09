// pkgAdmin/pages/admin/xiangce/upload-btn.js
const app = getApp()
const mediaApi= require("../../../../api/media")
var qiniu = require('../../../../utils/qiniu.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        mediaid: { type: Number },
        fileType: { type: String, value: 'image' }
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
        doUpload: function (paths) {
            wx.setKeepScreenOn({ keepScreenOn: true })
            wx.showLoading({ title: "上传中,请勿关闭", mask: true })
            var _this = this
            var path = paths.shift()
            qiniu.upload(path, function (url) {
                _this.insertPath(url)
                if (paths.length > 0) {
                    _this.doUpload(paths)
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
        chooseImages: function (e) {
            var that = this
            wx.chooseMedia({
                count: 9,
                mediaType: ['image'],
                sourceType: ['album', 'camera'],
                maxDuration: 30,
                success(res) {
                    var paths = []
                    var path = res.tempFiles
                    path.forEach(v => {
                        paths.push(v.tempFilePath)
                    })
                    that.doUpload(paths)
                }
            })
        },
        insertPath(url) {
            var _this = this
            var id = this.data.mediaid
            var type = this.data.fileType
            var data={
                filetype: type,
                url: url,
                media_cat_id: id
            }
            // 有待检测
            // app.request({
            //     url: '/api/v1/media_items/有待检测',
            //     method: 'POST',
            //     data: {
            //         filetype: type,
            //         url: url,
            //         media_cat_id: id
            //     },
            //     success: function (res) {
            //         _this.triggerEvent('change')
            //     }
            // })
            mediaApi.createMediaItem(data).then((res)=>{
                _this.triggerEvent('change')
            })
        },
        chooseVideo: function (e) {
            var _this = this
            wx.chooseMedia({
                count: 9,
                mediaType: ['video'],
                sourceType: ['album', 'camera'],
                maxDuration: 30,
                success(res) {
                    var paths = []
                    var path = res.tempFiles
                    path.forEach(v => {
                        paths.push(v.tempFilePath)
                    })
                    _this.doUpload(paths)
                }
            })
        },
        chooseHandle: function () {
            if (this.data.fileType == 'image') {
                this.chooseImages()
            } else if (this.data.fileType == 'video') {
                this.chooseVideo()
            }
        }
    },
})
