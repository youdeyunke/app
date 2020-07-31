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

        "config.style": function (style) {
            var bg = 'none'
            if ([0, 3].includes(style)) {
                bg = this.data.config.color
            }
            this.setData({ bodyBgColor: bg })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        text: '',
        textColor: '',
        bodyBgColor: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
