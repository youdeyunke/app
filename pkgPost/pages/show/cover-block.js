// pages/post/cover-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, default: null }

    },

    /**
     * 组件的初始数据
     */
    data: {
        showShareBox: false,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        shareHandle: function () {
            this.setData({ showShareBox: true })
        }
    }
})
