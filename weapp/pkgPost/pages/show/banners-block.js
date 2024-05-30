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
// pages/post/images-block.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD' }
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

                img.image = img.image
                counters[img.cat] += 1
                img.number = counters[img.cat]

            })

            const categorizedImages = Object.values(items.reduce((acc, img) => {
              if (!acc[img.cat]) {
                acc[img.cat] = [];
              }
              acc[img.cat].push(img);
              return acc;
            }, {}));
            
            // 合并不同类型的图片数组
            const mergedImages = categorizedImages.reduce((result, group) => result.concat(group), []);

            data.mergedImages = mergedImages
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
        showVideo: false,
        videoUrl: '',
        mergedImages: []
    },

    ready: function () {
    },

    /**
     * 组件的方法列表
     */
    methods: {

        itemClick: function (e) {
            var i = this.data.currentIndex
            var img = this.data.mergedImages[i]

            if (img.cat == 'video') {
                // var urls = [{
                //     url: img.url,
                //     // poster: img.image,
                //     type: 'video',
                // }]
                // wx.previewMedia({
                //     sources: urls,
                //     current: 0,
                // })
                var videoUrl = img.url
                this.setData({
                  videoUrl: videoUrl,
                  showVideo: true,
                })
                return
            }

            if (img.cat == 'vr') {
                app.gotoWebview(img.url, 'vr')
                return
            }

            var urls = this.data.mergedImages.filter((im, i) => {
                return im.cat == img.cat
            }).map((im, i) => {
                return im.image
            })

            wx.previewImage({
                current: img.image,
                urls: urls,
            })
            return
        },

        itemChange: function (e) {
            // console.log('item change', e)
            var source = e.detail.source
            var i = e.detail.current
            var item = this.data.mergedImages[i]
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
            // console.log('tab change', e)
            var tab = e.currentTarget.dataset.tab
            this.setData({
                currentTab: tab
            })
            var _this = this
            // 注意，不能使用forEach，因为异步问题
            for (var index = 0; index <= _this.data.mergedImages.length - 1; index++) {
                var item = _this.data.mergedImages[index]
                if (item.cat === tab) {
                    _this.setData({
                        currentIndex: index
                    })
                    return
                }
            }
        },

        closeVideoPopup(){
          this.setData({
            showVideo: false,
            videoUrl: ''
          })
        },

    }
})
