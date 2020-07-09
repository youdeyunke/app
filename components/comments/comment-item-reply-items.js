// components/comments/comment-item-reply-items.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: { type: Array, default: [] }
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,

    },

    observers: {
        "items": function (val) {
            if (val.length == 0) {
                this.setData({ show: false })
                return true
            }
            this.setData({ show: true })
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
    }

})
