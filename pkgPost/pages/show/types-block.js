// pages/post/types-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object }
    },

    observers: {
        "value.items": function (items) {
            items = items.map((item, i) => {
                if (item.images_list && item.images_list.length >= 1) {
                    item.hasImage = true
                    item.cover = item.images_list[0]
                } else {
                    item.hasImage = false
                    item.cover = '../../images/image-none.png'
                }
                return item
            })
            this.setData({ items: items })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        items: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
    }
})
