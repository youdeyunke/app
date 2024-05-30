/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// components/video-uploader/index.js
var upload = require('../../utils/upload');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        width: { type: Number, value: 200 },
        height: { type: Number, value: 200 }
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
            upload.upload(path, function (url) {
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
                success (res) {
                    this.success(res.tempFiles[0].tempFilePath)
                },
                success: function (res) {
                    const paths = [res.tempFiles[0].tempFilePath]
                    _this.doUpload(paths)
                }
            })

        },
    }
})