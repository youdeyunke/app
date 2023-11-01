/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/broker/hot-brokers.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: null
        },
        postId: {
            type: Number,
            value: null
        },
    },

    observers: {
        "item.level": function (v) {
            var levelImgs = [
                app.globalData.ui.broker_medal_1,
                app.globalData.ui.broker_medal_2,
                app.globalData.ui.broker_medal_3,
            ]
            // v = 1,2,3
            // https://qiniucdn.udeve.net/fang/medal.{{item.level}}.png
            v = v - 1
            this.setData({
                levelImg: levelImgs[v]
            })

        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        levelImg: '',
        bg: '',
        items: [],
    },

    ready: function () {

        var color = app.globalData.color
        this.setData({
            bg: color.broker_block_bg,
            primaryColor: color.primary,
        })

    },

    /**
     * 组件的方法列表
     */
    methods: {
        shuffle: function (arr) {
            var i = arr.length,
                t, j
            while (i) {
                j = Math.floor(Math.random() * i--)
                t = arr[i]
                arr[i] = arr[j]
                arr[j] = t
            }
        },

        zixun: function () {
            if (!app.globalData.token) {
                this.selectComponent('.loginwindow').openWindow()
                return
            }

            var uid = this.data.item.user_id
            var pid = this.data.postId
            var path = `/pages/messages/show?target_user_id=${uid}&post_id=${pid}`
            if (this.data.postId) {
                path += '&target_post_id=' + this.data.postId
            }
            wx.navigateTo({
                url: path,
            })

        }


    }
})