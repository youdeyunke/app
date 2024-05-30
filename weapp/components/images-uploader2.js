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
// components/images-uploader2.js
var upload = require('../utils/upload.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imagesStr: { type: String, value: '' },
        max: { type: Number, value: 10 },
        width: { type: Number, value: 160 },
        height: { type: Number, value: 160 }
    },

    observers: {
        'imagesStr': function (val) {
            var images = []
            val.split(',').forEach((url, i) => {
                var n = i + 1
                if (url.length > 0) {
                    images.push({
                        url: url,
                        isImage: true,
                        name: '图片' + n
                    })
                }
            })
            this.setData({ images: images })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        images: [
            // {url: '',name: '', isImage: true}
        ],
    },

    /**
     * 组件的方法列表
     */
    methods: {

        afterRead: function (event) {
            const { file } = event.detail
            if (file.length == 0) {
                wx.showToast({ title: '请选择图片', icon: 'none' });
                return false
            }
            var paths = []
            file.forEach((f, i) => {
                paths.push(f.url)
            })
            this.doUpload(0, paths)
        },

        doUpload: function (i, paths) {
            var _this = this
            if (i + 1 > paths.length) {
                _this.hasChanged()
                wx.hideLoading()
                return false
            }
            upload.upload(paths[i], function (url) {
                _this.addToImages(url)
                _this.doUpload(i + 1, paths)
            })
        },

        hasChanged: function () {
            var urls = []
            this.data.images.forEach((image, i) => {
                var url = image.url.split('?')[0]
                urls.push({ url: url })
            })
            this.setData({
                images: urls
            })
            this.triggerEvent('change', { value: urls })
        },

        addToImages: function (url) {
            var url = url + '?imageView2/2/w/80'
            var images = this.data.images
            images.push({
                url: url,
                isImage: true,
            })
            this.setData({ images: images })
        },

        deleteHandle: function (e) {
            var i = e.currentTarget.dataset.index
            var images = this.data.images
            images.splice(i, 1)
            this.setData({ images: images })
            this.hasChanged()
        },
        Preview: function (e) {
            let url = e.currentTarget.dataset.index
            wx.previewImage({
                current: url,
                urls: [url]
            })
        }


    }
})
