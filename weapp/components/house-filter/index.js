/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// components/house-filter/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filter: { type: Object, default: {} },
        options: { type: Object, default: null },
    },
    observers: {
        'options': function (v) {
        }
    },



    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // otherChange: function (e) {
        //     var filter = this.data.filter
        //     var keys = Object.keys(e.detail)
        //     keys.forEach((key, i) => {
        //         filter[key] = e.detail[key]
        //     })
        //     this.setData({ filter: filter })
        //     this.triggerEvent('change', filter)
        // },

        // priceChange: function (e) {
        //     var filter = this.data.filter
        //     var data = e.detail
        //     if (data.price && data.price.length >= 3) {
        //         filter.price = data.price
        //     } else {
        //         delete filter.price
        //     }

        //     if (data.total_price && data.total_price.length >= 3) {
        //         filter.total_price = data.total_price
        //     } else {
        //         delete filter.total_price
        //     }
        //     this.setData({ filter: filter })
        //     this.triggerEvent('change', filter)

        // },

        // orderChange: function (e) {
        //     // TODO CHANGE FILTER
        //     const { order } = e.detail
        //     var filter = this.data.filter
        //     filter.order = order
        //     this.triggerEvent('change', filter)

        // },
        // cityChange: function (e) {
        //     // city id or district id change
        //     // TODO 
        //     console.log('city change e', e)
        //     const { city_id, district_id } = e.detail
        //     var filter = this.data.filter
        //     filter.city_id = city_id || null
        //     filter.district_id = district_id || null
        //     this.triggerEvent('change', filter)
        // },

        fitmentChange (e) {
            var filter = this.data.filter
            var data = e.detail
            console.log(data, filter, this.data.filter, this.data);

            if (data.fitment) {
                filter.fitment = data.fitment
            } else {
                delete filter.fitment
            }
            this.triggerEvent('change', filter)
        },
        positionChange (e) {
            var filter = this.data.filter
            var data = e.detail
            console.log(data, filter, this.data.filter, this.data);

            if (data.position) {
                filter.position = data.position
            } else {
                delete filter.position
            }
            this.triggerEvent('change', filter)
        },
        categoryChange (e) {
            var filter = this.data.filter
            var data = e.detail
            console.log(data, filter, this.data.filter, this.data);

            if (data.category) {
                filter.category = data.category
            } else {
                delete filter.category
            }
            this.triggerEvent('change', filter)
        },
    }


})
