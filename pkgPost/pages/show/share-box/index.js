// pkgPost/components/share-box/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: { type: Boolean, value: false }

    },

    /**
     * 组件的初始数据
     */
    data: {
        showTips: false,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        wechatHandle: function () {

        },

        closeTips: function () {
            this.setData({ showTips: false })
        },

        timelineHandle: function () {
            // TODO 作图
            this.setData({ showTips: true, show: false })
        },
        closeHandle: function (e) {
            this.setData({ show: false })
        }

    }
})
