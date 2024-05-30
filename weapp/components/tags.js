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
// components/tags.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        max: { type: Number, value: 3 },
        items: { type: Array, value: [] },
        size: { type: String, value: 'default' },
        colorIndex: { type: Number, value: 0 },
    },
    observers: {
        "items": function () {
            var safeItems = this.data.items.slice(0, this.data.max)
            this.setData({ safeItems: safeItems })
        }
    },
    ready: function () {
        var safeItems = this.data.items.slice(0, this.data.max)
        this.setData({ safeItems: safeItems })
    },

    /**
     * 组件的初始数据
     */
    data: {
        safeItems: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
