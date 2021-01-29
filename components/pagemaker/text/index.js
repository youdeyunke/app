// components/pagemaker/text/index.js
Component({
    /**
     * 组件的属性列表
     */

    properties: {
        config: { type: Object, default: null }
    },

    observers: {
        "config.fontSize": function (v) {
            v = v * 2
            v = v + 'rpx'
            this.setData({ fontSize: v })
        },

        "config.lineHeight": function (v) {
            v = v + '%'
            this.setData({ lineHeight: v })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        fontSize: '24rpx',
        lineHeight: '100%',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
