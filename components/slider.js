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
// components/slider.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: { type: Array, value: [] },

    },

    ready: function () {
        var _this = this
        app.ensureConfigs((configs) => {
            _this.setData({ bg: configs.plugin_home_topbar_color_desc })
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        bg: '#ffffff'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoSearch: function (e) {
            wx.navigateTo({
                url: '/pages/search/index'
            })
        },

        goto: function (e) {
            var i = e.currentTarget.dataset.index
            var item = this.data.items[i]
            switch (item.opentype) {
                case 'navigateTo':
                    wx.navigateTo({ url: item.path })
                    break
                case 'switchTab':
                    wx.switchTab({ url: item.path })
                    break
            }
        },

    }
})
