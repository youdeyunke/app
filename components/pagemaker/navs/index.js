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
                console.log('nav item', item)
                if (item.showCount && item.link && item.link.path.includes('album_id')) {
                    var r = item.link.path.split('album_id=')
                    item.showCount = true
                    item.albumId  = r[1]
              
                }else{
                    item.showCount = false 
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
