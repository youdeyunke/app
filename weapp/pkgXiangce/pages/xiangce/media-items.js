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
// pkgXiangce/pages/xiangce/index/media-items.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: { type: Array },
    },

    /**
     * 组件的初始数据
     */
    data: {
        showVideo: false,
        //mark: 'watermark/4/text/6IGq5bGL6YCJ5oi_/font/5a6L5L2T/fontsize/500/fill/Z3JheQ==/dissolve/50/rotate/-45/uw/100/uh/100/resize/1',
        mark: '',
        playVideo: false,
        videoUrl: '',
    },

    ready: function () {
        var _this = this
        setTimeout(() => {
            _this.setData({ showVideo: true })
        }, 500)

    },

    /**
     * 组件的方法列表
     */
    methods: {

        viewVideo: function (i) {
            var _this = this

            var urls = this.data.items.map((m) => { return { url: m.url, type: 'video' } })
            console.log(urls)
            wx.previewMedia({
                sources: urls,
                current: i
            })
        },
        viewImage: function (item) {
            var _this = this
            var url = item.url + '?' + this.data.mark
            var urls = this.data.items.filter( item => item.filetype == 'image').map((m, i) => { return m.url + '?' + _this.data.mark })
            wx.previewImage({
                current: url,
                urls: urls,
            })
        },
        itemClick: function (e) {
            var _this = this
            var index = e.currentTarget.dataset.index
            var item = this.data.items[index]
            console.log('index is', index, 'item is', item, 'items sis', this.data.items)
            switch (item.filetype) {
                case 'image':
                    _this.viewImage(item)
                    break;
                case 'video':
                    var url = item.url
                    // app.gotoVideo(url, '视频')
                    // var videoUrl = img.url
                    this.setData({
                      videoUrl: url,
                      playVideo: true,
                    })
                    break;
            }

        },
        closeVideoPopup(){
            this.setData({
                playVideo: false,
                videoUrl: ''
            })
        },
  
    }
})
