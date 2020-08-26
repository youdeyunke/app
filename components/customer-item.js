// pages/fenxiao/customer-item.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: null },
    },

    observers: {
        "item.id": function (val) {
            var items = app.globalData.myconfigs['deal_status_items'] || []
            var steps = items.map((item, index) => {
                return { text: item.name }
            })
            this.setData({
                steps: steps
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        steps: [],
        isPending: null,
        isPass: null,
        isReject: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
    }

})
