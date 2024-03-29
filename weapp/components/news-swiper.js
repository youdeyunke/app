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
// components/news-swiper.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: { type: Array, value: [] },
        limit: { type: Number, value: 3 },
    },

    ready: function () {
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
        itemClick: function (e) {
            var _this = this
            var index = e.currentTarget.dataset.index
            var item = this.data.items[index]
            var url = item.url
            var path = '/pkgNews/pages/news/show?id=' + item.id
            wx.navigateTo({ url: path, })

        },


    }
})
