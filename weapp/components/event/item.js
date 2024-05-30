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
// components/event/item.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        canDelete: { type: Boolean },
        event: { type: Object },
    },

    observers: {
        "event.images": function (val) {
            if (!val) {
                return []
            }
            var urls = val.split(',')
            this.setData({ images: urls })
        }
    },

    ready: function () {
        this.setData({
            color: app.globalData.myconfigs.color.primary,
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        images: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {
        imageClickHandle: function (e) {
            var index = e.currentTarget.dataset.index
            var url = this.data.images[index]
            var urls = this.data.images
            wx.previewImage({
                current: url,
                urls: urls,
                success: (result) => {

                },
                fail: () => { },
                complete: () => { }
            });

        },

    }
})
