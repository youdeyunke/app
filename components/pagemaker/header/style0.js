// components/pagemaker/header/style0.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: { type: String, value: '' },
        subtitle: { type: String, value: '' },
        link: { type: Object, value: null },

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
        linkHandle: function (e) {
            if (!this.link) {
                return false
            }
            // TODO link handle
            app.linkHandle(this.data.link)
        },

    }
})
