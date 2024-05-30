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
// pages/post/header-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        post: { type: Object, value: {} },
        navs: { type: Array, default: null },
        color: { type: String, value: '#3A6BDD' },
        bgImgUrl: { type: String },
    },

    /**
     * 组件的初始数据
     */
    data: {
        point: null,
    },

    observers: {
        "post": function (p) {
            if (!p) {
                return
            }
            var pt = p.point_title

            if (pt && pt.length >= 3) {
                var p = { title: '项目亮点', content: '' }
                pt = pt.replaceAll('：', ':')
                var res = pt.split(':')
                if (res.length == 1) {
                    p.content = pt
                } else {
                    p.title = res.splice(0, 1)
                    p.content = res.join(':')
                }
                this.setData({ point: p })
            }
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {
        gotoLocation: function () {
            var _this = this
            //先获取授权状态
            wx.getSetting({
                success: (res) => {
                    console.log(res.authSetting)
                    //如果scope.userLocation 为false 则引导用户授权
                    if (!res.authSetting['scope.userLocation']) {
                        _this.openSetting()
                    } else {
                        //如果为true 则直接获取地理位置
                        _this.openLocation()
                    }
                },
            });
        },

        openLocation: function () {
            wx.openLocation({
                latitude: Number(this.data.post.latitude),
                longitude: Number(this.data.post.longitude),
                name: this.data.post.title,
                address: this.data.post.address,
            })
        },
        openSetting () {
            var _this = this
            wx.showModal({
                title: '定位权限',
                showCancel: false,
                content: "导航功能需要先允许使用您的地理位置",
                confirmText: "去授权",
                success (res) {
                    if (res.confirm) {
                        wx.openSetting({
                            success: (res) => {
                                _this.openLocation()
                            },
                        });
                    }
                }
            })
        },
    }
})
