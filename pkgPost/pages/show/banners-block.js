// pages/post/images-block.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: Object
        },
    },

    observers: {
        "value.cats": function (cats) {
            if (cats && cats.length > 0) {
                this.setData({
                    tabs: cats,
                    currentTab: cats[0].value,
                })
            }
        },
        "value.banners": function (items) {
            if (!items || items.length == 0) {
                return
            }
            var data = {}
            var counters = {}
            data.images = items
            items.forEach((img, i) => {

                if (!counters[img.cat]) {
                    counters[img.cat] = 0
                }

                img.image = img.image + '?imageView2/5/h/520/w/750'
                counters[img.cat] += 1
                img.number = counters[img.cat]

            })


            data.counters = counters
            this.setData(data)
        }
    },


    /**
     * 组件的初始数据
     */
    data: {
        images: [],
        vrIcon: '',
        videoIcon: '',
        currentTab: '',
        currentIndex: 0,
        tabs: [],
    },

    ready: function () {
        var ui = app.globalData.myconfigs.ui
        var color = app.globalData.myconfigs.color
        this.setData({
            vrIcon: ui.post_cover_icon_vr,
            videoIcon: ui.post_cover_icon_video,
            primaryColor: color.primary,
            primaryBtnColor: color.primary_btn,
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

        itemClick: function (e) {
            var i = this.data.currentIndex
            var img = this.data.images[i]
            if (img.cat == 'image') {
                var urls = this.data.images.filter((im, i) => {
                    return im.cat == 'image'
                }).map((img, i) => {
                    return img.image
                })
                wx.previewImage({
                    current: img.image,
                    urls: urls,
                })
                return
            }

            if (img.cat == 'video') {
                var urls = [{
                    url: img.url,
                    poster: img.image,
                    type: 'video',
                }]
                wx.previewMedia({
                    sources: urls,
                    current: 0,
                })
                return
            }

            if (img.cat == 'vr') {
                app.gotoWebview('vr', img.url)
            }



            var url = img.url
            wx.navigateTo({
                url: url
            })
        },

        itemChange: function (e) {
            console.log('item change', e)
            var source = e.detail.source
            var i = e.detail.current
            var item = this.data.images[i]
            if (source == "") {
                // 点击切换tab 不处理
                return false
            }

            this.setData({
                currentTab: item.cat,
                currentIndex: i,
            })
        },

        tabChange: function (e) {
            console.log('tab change', e)
            var tab = e.currentTarget.dataset.tab
            this.setData({
                currentTab: tab
            })
            var _this = this
            // 注意，不能使用forEach，因为异步问题
            for (var index = 0; index <= _this.data.images.length - 1; index++) {
                var item = _this.data.images[index]
                if (item.cat === tab) {
                    _this.setData({
                        currentIndex: index
                    })
                    return
                }
            }
        },

    }
})