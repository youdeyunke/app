// components/message/post.js
const app = getApp()
const api = require("../../api/post")
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
            // 有待检验
            api.getPostBaseInfo(pid).then((resp) => {
                var post = resp.data.data
                wx.setStorageSync(key, post)
                _this.setData({
                    post: post
                })
            })
        },

    }
})