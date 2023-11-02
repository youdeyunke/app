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
// components/message/post.js
const app = getApp()
const postApi = require("../../api/post")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        position: {
            type: String,
            value: ''
        },
        message: {
            type: Object,
            value: null,
        },

        currentUserId: {
            type: Number,
            value: null,
        },

    },

    ready: function () {
        this.getPost()
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
        getPost: function () {
            // 拉取post
            var pid = this.data.message.content
            var _this = this
            var key = 'post_base_info.' + pid
            postApi.getPostBaseInfo(pid).then((resp) => {
                var post = resp.data.data
                wx.setStorageSync(key, post)
                _this.setData({
                    post: post
                })
            })
        },

    }
})