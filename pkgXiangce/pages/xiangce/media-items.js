// pkgXiangce/pages/xiangce/index/media-items.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: { type: Object, value: [] }
    },

    /**
     * 组件的初始数据
     */
    data: {
        showVideo: false,
        mark: 'watermark/4/text/6IGq5bGL6YCJ5oi_/font/5a6L5L2T/fontsize/500/fill/Z3JheQ==/dissolve/50/rotate/-45/uw/100/uh/100/resize/1',
        mark: 'watermark/4/text/5oi_5bCP54mbCg/font/5a6L5L2T/fontsize/500/fill/Z3JheQ==/dissolve/50/rotate/-45/uw/200/uh/200/resize/1'
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
        viewImage: function (item) {
            var _this = this
            var url = item.url + '?' + this.data.mark
            var urls = this.data.items.map((m, i) => { return m.url + '?' + _this.data.mark })
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
            switch (item.file_type) {
                case 'image':
                    _this.viewImage(item)
                    break;
                case 'video':
                    var url = item.url
                    app.gotoVideo(url, '视频')
                    break;
            }

        },

    }
})
