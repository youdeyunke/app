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
// pkgMyself/pages/history/historyPostItem/index.js
const postApi = require("../../../../api/post")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId: { type: Number, default: null }
    },

    observers: {
        "postId": function (value) {
            var _this = this
            if (value) {
                postApi.getPostBaseInfo(value).then((resp) => {
                    if (resp.data.status != 0) {
                        return
                    }
                    _this.setData({
                        post: resp.data.data
                    })
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        post: {},
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
