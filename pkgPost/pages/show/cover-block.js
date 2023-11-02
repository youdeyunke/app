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
// pages/post/cover-block.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, value: null },

    },

    /**
     * 组件的初始数据
     */
    data: {
        showShareBox: false,
        shareIcon: '',
        vrIcon: '',
        videoIcon: '',
        eyeIcon: '',

    },

    ready: function () {
        var ui = app.globalData.ui
        this.setData({
            vrIcon: ui.post_cover_icon_vr,
            videoIcon: ui.post_cover_icon_video,
            eyeIcon: ui.post_covver_icon_eye,
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        shareHandle: function () {
            this.setData({ showShareBox: true })
        },
        vrHandle: function () {
            var url = '/pkgVr/pages/vr/index?post_id=' + this.data.value.id
            wx.navigateTo({
                url: url,
            })
        },
    },
})
