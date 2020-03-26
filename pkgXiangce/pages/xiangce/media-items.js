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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        viewImage: function (item) {
            var url = item.url
            var urls = this.data.items.map((m, i) => { return m.url })
            wx.previewImage({
                current: url,
                urls: urls,
            })
        },
        itemClick: function (e) {
            var _this = this
            var index = e.currentTarget.dataset.index
            var item = this.data.items[index]
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
