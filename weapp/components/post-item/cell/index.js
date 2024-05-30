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
                var url = '/pkgPost/pages/show/index?id=' + post.id
                this.setData({ url: url })

            }
            if (post.point_title !== null && post.point_title !== undefined) {
                //将post.point_title中的中英文：都转为英文:
                var point_title = post.point_title.replace(/：/g, ':')
                //将point_title按英文:分割成数组
                var point_title_arr = point_title.split(':')
                //如果数组长度大于1，说明有中英文:，将数组第一个元素赋值给point_title，将数组剩余元素以:连接为字符串后赋值给point.content
                var point = { }
                if (point_title_arr.length > 1) {
                    point.title = point_title_arr[0]
                    point.content = point_title_arr.slice(1).join(':')
                } else {
                    point.title = '楼盘亮点'
                    point.content = post.point_title
                }
                
            }
            this.setData({ url: post.url, point: point })

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
