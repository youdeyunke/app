// components/card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

        width: { type: Number, value: 750, },
        title: { type: String, value: '标题' },
        titleSize: {type: Number, value: 32},
        titleColor: {type: String, value: '#333333'},
        subTitle: { type: String, value: '' },
        url: { type: String, value: null },
        hat: {type: Boolean, value: false, },
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
            console.log('url:', this.data.url, 'opentype', this.data.opentype)
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
                    console.log('hello')
                    break;
                default:
                    console.log('default:', _this.data.opentype.toLowerCase, 'url', url)
            }
        },

    }
})
