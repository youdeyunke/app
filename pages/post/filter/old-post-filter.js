// pages/post/filter/old-post-filter.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filter: { type: Object, default: null }
    },

    /**
     * 组件的初始数据
     */
    data: {
        orderOptions: [
            {
                label: "默认",
                value: null
            },
            {
                label: "面积（从大到小)",
                value: "area desc"
            },
            {
                label: "面积（从小到大)",
                value: "area asc"
            },
            {
                label: "总价（从小到大)",
                value: "total_price  asc"
            },
            {
                label: "总价（从大到小)",
                value: "total_price desc"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        orderChange: function (e) {
            // TODO CHANGE FILTER
            const { order } = e.detail
            var filter = this.data.filter
            filter.order = order
            this.triggerEvent('change', filter)

        },
        cityChange: function (e) {
            // city id or district id change
            // TODO 
            console.log('city change e', e)
            const { city_id, district_id } = e.detail
            var filter = this.data.filter
            filter.city_id = city_id || null
            filter.district_id = district_id || null
            this.triggerEvent('change', filter)
        },
    }


})
