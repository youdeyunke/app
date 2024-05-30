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
// pages/qa/answer-like.js
const app = getApp()
const qaApi = require("../../api/qa")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: { type: Number, value: 0 },
        aid: { type: Number, value: null, },
    },
    /**
     * 组件的初始数据
     */
    data: {
        likesCount: 0,
        liked: false,
        cacheKey: null,
    },

    observers: {
        "count": function (count) {
            this.setData({ likesCount: count })
        },
        "aid": function (aid) {
            var cacheKey = 'answer.' + aid + '.liked'
            var _this = this
            this.setData({ cacheKey: cacheKey })
            this.setData({
                liked: _this.isLiked()
            })
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {

        isLiked: function () {
            return wx.getStorageSync(this.data.cacheKey) == 'liked'
        },

        // 标记为已点赞
        markLiked: function () {
            this.setData({ liked: true })
            wx.setStorageSync(this.data.cacheKey, 'liked')
        },

        likeHandle: function () {
            // 检查一下是否点过赞
            if (this.data.liked) {
                return false
            }

            // 没有点过赞
            var _this = this
            qaApi.likeAnswer(_this.data.aid).then((resp) => {
                var likes = resp.data.data
                _this.markLiked()
                _this.setData({ likesCount: likes })
            })
        },

    }
})
