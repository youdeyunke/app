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
// components/card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

        width: { type: Number, value: 750, },
        title: { type: String, value: '标题' },
        titleSize: { type: Number, value: 32 },
        titleColor: { type: String, value: '#333333' },
        subTitle: { type: String, value: '' },
        url: { type: String, value: null },
        hat: { type: Boolean, value: false, },
        radius: { type: Number, value: 2 },
        opentype: { type: String, value: 'navigateTo' }
    },

    /**
     * 组件的初始数据
     */
    data: {
        titleSize: '28'
    },

    /**
     * 组件的方法列表
     */
    methods: {

        actionHandle: function (e) {
            // console.log('url:', this.data.url, 'opentype', this.data.opentype)
            if (!this.data.url) {
                return false
            }

            var _this = this
            var url = _this.data.url
            switch (_this.data.opentype.toLowerCase()) {
                case 'navigateto':
                    wx.navigateTo({
                        url: url,
                    })
                    break;
                case "switchtab":
                    wx.switchTab({
                        url: url,
                    })
                    break;
                case "webview":
                    wx.navigateTo({
                        url: '/pages/webview/webview?url=' + url,
                    })
                    // console.log('hello')
                    break;
                default:
                    console.log('default:', _this.data.opentype.toLowerCase, 'url', url)
            }
        },

    }
})
