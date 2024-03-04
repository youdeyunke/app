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
// components/pagemaker/searchbar/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },

    observers: {
        "config.keywords": function (kws) {
            // 搜索词设置为全局
            app.globalData.hotKeywords = kws
        },
        "config.text": function (v) {
            var text = v.cat == 'default' ? v.defaultValue : v.value
            var textColor = v.cat == 'default' ? v.defaultColor : v.color
            this.setData({ text: text, textColor: textColor })
        },
        "config.height": function(h){
            if(!h || !h.value){
                return
            }
            var val = h.value * 2 + 'rpx'
            this.setData({heightValue: val})

        },

        "config.style": function (style) {
            var bg = 'none'
            if ([0, 3].includes(style)) {
                bg = this.data.config.color
            }
            this.setData({ bodyBgColor: bg })
        },

        "config.radius": function(v){
            var value = v ? v.value * 2 + 'rpx' : '0rpx'
            this.setData({radiusValue: value})
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        text: '',
        textColor: '',
        bodyBgColor: '',
        heightValue: '80rpx',
     
    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoSearch: function () {
            wx.navigateTo({
                url: '/pkgSearch/page/search/index',
                success: (result) => {

                },
                fail: () => { },
                complete: () => { }
            });

        },

    }
})
