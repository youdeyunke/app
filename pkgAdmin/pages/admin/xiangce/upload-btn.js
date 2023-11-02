/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgAdmin/pages/admin/xiangce/upload-btn.js
const app = getApp()
const mediaApi = require("../../../../api/media")
var upload = require('../../../../utils/upload.js');

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
            upload.upload(path, function (url) {
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
                success (res) {
                    var paths = []
                    var path = res.tempFiles
                    path.forEach(v => {
                        paths.push(v.tempFilePath)
                    })
                    that.doUpload(paths)
                }
            })
        },
        insertPath (url) {
            var _this = this
            var id = this.data.mediaid
            var type = this.data.fileType
            var data = {
                filetype: type,
                url: url,
                media_cat_id: id
            }
            mediaApi.createMediaItem(data).then((res) => {
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
                success (res) {
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
