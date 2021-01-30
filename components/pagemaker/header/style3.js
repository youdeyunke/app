// components/pagemaker/header/style0.js
const link = require('../link.js')
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

        clickHandle: function (e) {
            link.clickHandle(this.data.link)
        }

    }
})
