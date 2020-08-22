// pages/post/filter/index.js
Component({
    /**
     * 组件的属性列表
     * 根据filter传递的参数，自动调用对应房源的filter
     */

    properties: {
        filter: { type: Object, default: null }
    },

    observers: {
        "filter.group_v2": function (g) {
            this.setData({ postGroup: g })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        postGroup: 'new', // 房源的类型
    },

    /**
     * 组件的方法列表
     */
    methods: {
        filterChange: function (e) {
            this.triggerEvent("change", e.detail)
        }
    }
})
