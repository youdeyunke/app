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
                '/assets/icons/broker/broker.level.1.png',
                '/assets/icons/broker/broker.level.2.png',
                '/assets/icons/broker/broker.level.3.png',
            ]
            // v = 1,2,3
            // https://tcdn.udeve.net/fang/medal.{{item.level}}.png
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
        bg: 'https://tcdn.udeve.net/udyk/65e946658eca4d65ccc012ec.png',
        items: [],
    },

    ready: function () {

        var color = app.globalData.color
        this.setData({
            // bg: color.broker_block_bg,
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
            if (app.globalData.LOGIN_FLAG != 1) {
                this.selectComponent('.loginwindow').openWindow()
                return
            }

            var phone =  this.data.item.mobile
            wx.makePhoneCall({
                phoneNumber: phone,
            });

        }


    }
})