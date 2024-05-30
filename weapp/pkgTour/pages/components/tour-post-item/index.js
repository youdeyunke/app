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
// pkgTour/pages/components/tour-post-item/index.js
const postApi = require("../../../../api/post")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId: {
            type: Number,
            default: null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        post: {}
    },

    observers: {
        "postId": function (val) {
            if (!val) {
                return
            }
            var _this = this
            postApi.getPostBaseInfo(val).then((res) => {
                if (res.data.code != 0) {
                    return
                }
                var post = res.data.data
                _this.setData({
                    post: post,
                })
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})