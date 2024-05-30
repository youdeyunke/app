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
// pkgPost/components/default-contact/index.js
// const auth = require("../../../utils/auth");
const auth = require("../../utils/auth");
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        post: { type: Object, value: null },
    },

    /**
     * 组件的初始数据
     */
    data: {
        showShareBox: false,
        primaryBtnColor: "#ff9600",
        secondaryBtnColor: "#3a67c0",
    },

    ready: function () {
        var color = app.globalData.myconfigs.color
        this.setData({
            primaryBtnColor: color.primary_btn,
            secondaryBtnColor: color.secondary_btn,
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bookingHandle: function (e) {
            var _this = this
            wx.navigateTo({
              url: '/pkgBooking/pages/booking/index?pid=' + _this.data.post.id,
            })
        },

        joinHandle: function (e) {
            var pid = this.data.post.id

            wx.navigateTo({
                url: '/pkgBroker/pages/broker/join?post_id=' + pid,
            })

        },

        favChangeHandle: function (e) {
            console.log('fav change 222', e)
            var s = e.detail.status
            var name = "收藏了楼盘:"
            if (s == 0) {
                name = "取消收藏楼盘:"
            }

        },

        shareHandle: function () {
            console.log("niiiiiiiii", this.properties.post.id)
            this.setData({ showShareBox: true })
        },
        phoneHandle: function () {
            // console.log("data:",this.data.post.sub_phone);
            var phone = this.data.post.phone
            var sub = this.data.post.sub_phone
            var postId = this.data.post.id
            if (sub) {
                phone = phone + ',' + sub
            }
            // 弹出文本提示
            var n = app.globalData.myconfigs.xcx_name
            var t = '接通后请告知来自：【' + n + '小程序】'
            wx.showModal({
                confirmText: '拨打',
                cancelText: '取消',
                title: '提示',
                content: t,
                success: (res) => {
                    if (res.confirm) {
                        wx.makePhoneCall({
                            phoneNumber: phone,
                            success: (result) => {
                            },
                        });
                    }
                }

            })
        },
    }
})
