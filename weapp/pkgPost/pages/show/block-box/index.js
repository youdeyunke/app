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
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: { type: String, value: '标题' },
        subTitle: { type: String, value: '' },
        url: { type: String, value: null },
        opentype: { type: String, value: 'navigateto' },
        leftHat: { type: Boolean, value: false },
        leftHatColor: { type: String, value: '#000000' }
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
                    // console.log('hello')
                    break;
                case "switchtab":
                    wx.switchTab({
                        url: url,
                    })
                    // console.log('hello')
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
