// pages/post/events-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD'}
    },

    observers: {
        "value.items": function (items) {
            var events = []
            items.forEach((item, i) => {
                item['created_at'] = item['created_at'].split('T')[0]
                events.push(item)
            })
            this.setData({ event: items[0] })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        event: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
