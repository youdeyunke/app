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
// components/tt.js
const app = getApp()

Component({
    options: {

    },

    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: {} },
    },

    observers: {
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    ready: function () {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        clickHandle: function () {
            if (this.data.item.open_type == 'weapp') {
                wx.navigateTo({
                    url: '/pkgVr/pages/vr/show?id=' + this.data.item.id,
                })
                return
            }

            wx.setClipboardData({
                data: this.data.item.url,
            })
            wx.showModal({
                title: '操作提示',
                content: '由于小程序的限制，该页面无法在小程序中打开，请前往浏览器粘贴网址进行访问。',
                cancelColor: 'cancelColor',
            })
        },
    }
})
