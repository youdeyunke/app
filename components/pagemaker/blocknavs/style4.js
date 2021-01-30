// components/pagemaker/blocknavs/style5.js
const link = require('../link.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },

    observers: {
        "config.image": function (url) {
            if (!url) {
                return
            }
            this.setData({
                image: "url('" + url + "')"
            })

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        image: null

    },

    /**
     * 组件的方法列表
     */
    methods: {

        clickHandle: function (e) {
            const { index } = e.currentTarget.dataset
            var data = this.data.config.blocks[index].link
            link.clickHandle(data)
        }

    }
})
