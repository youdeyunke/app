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
// components/no-result.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        height: null,
        text: { type: String, value: '没有数据' },
    },

    observers: {
        "height": function (v) {
            this.setData({
                heightStr: v + 'px'
            })
        },
    },

    ready: function () {
        var system = wx.getSystemInfoSync()
        var height = system['windowHeight']
        this.setData({ height: height })
    },

    /**
     * 组件的初始数据
     */
    data: {
        heightStr: '100%'
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
