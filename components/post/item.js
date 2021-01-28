// components/post.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: String, value: 'normal',
        },
        border: {
            type: Boolean, value: true,
        },
        shadow: {
            type: Boolean, value: true,
        },
        item: {
            type: Object, value: {},
        }
    },

    ready: function () {
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

    }
})
