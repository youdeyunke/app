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
// components/pagemaker/posts/post-item0.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        post: { type: Object, value: {} },
        point: null,
        border: { type: Boolean, value: true, },
    },

    observers: {
        "post": function (post) {
            if (!post) {
                return
            }
            if (!post.id) {
                return
            }
            if (!post.url) {
                var url = '/pkgErshou/pages/show?id=' + post.id
                this.setData({ url: url })
                return
            }
            this.setData({ url: post.url })

        },
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

    }
})
