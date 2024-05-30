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
// components/post-title/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        post: { type: Object, value: null },
        height: { type: Number, value: 300 },
        width: { type: Number, value: 750 },
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

        clickHandle: function (e) {
            var pages = getCurrentPages()
            if (pages.length > 1) {
                wx.navigateBack({
                    delta: -1,
                })
                return
            }
            var url = "/pkgPost/pages/show/index?id=" + this.data.post.id
            wx.navigateTo({
                url: url
            })

        },

    }
})
