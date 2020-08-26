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

        "item.created_at": function (t) {
            console.log('created', t)
            var dt = t.split('T')[0]
            var tm = t.split('T')[1].split('.')[0]
            var v = dt + ' ' + tm
            this.setData({
                createdAt: v
            })
        }
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
