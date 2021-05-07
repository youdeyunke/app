// pages/post/filter/old-post-filter.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filter: { type: Object, default: null },
        options: { type: Object, default: null },
    },
    observers: {
        'options': function (v) {
            console.log('options change in new-post-filter.js ', v)
        }
    },



    /**
     * 组件的初始数据
     */
    data: {
        showPop: false,
        orderOptions: [
            {
                label: "默认",
                value: null
            },
   
            {
                label: "均价（从小到大)",
                value: "custom_average_price  asc"
            },
            {
                label: "均价（从大到小)",
                value: "custom_average_price desc"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        otherChange: function (e) {
            var filter = this.data.filter
            var keys = Object.keys(e.detail)
            keys.forEach((key, i) => {
                filter[key] = e.detail[key]
            })
            this.setData({ filter: filter })
            this.triggerEvent('change', filter)
        },

        priceChange: function (e) {
            var filter = this.data.filter
            var data = e.detail
            if (data.price && data.price.length >= 3) {
                filter.price = data.price
            } else {
                delete filter.price
            }

            if (data.total_price && data.total_price.length >= 3) {
                filter.total_price = data.total_price
            } else {
                delete filter.total_price
            }
            this.setData({ filter: filter })
            this.triggerEvent('change', filter)

        },

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
