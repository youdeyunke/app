const link = require("../link")


// components/pagemaker/navs/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null },
    },

    observers: {
        "config.items": function (items) {
            var navs = items.map((item, i) => {
                if (item.title.includes('-')) {
                    var r = item.title.split('-')
                    item.showCount = true
                    item.count = r[1]
                    item.title = r[0]
                }
                return item
            })
            console.log('navs is', navs)
            this.setData({ navs: navs })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        navs: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickHandle: function (e) {
            console.log('nav click', e)
            const { index } = e.currentTarget.dataset
            var item = this.data.navs[index]
            link.clickHandle(item.link)

        }

    }
})
