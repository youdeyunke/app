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
        "options.cats": function(v){
            this.setData({catOptions: v})
        },
        "options.fitments": function(v){
            this.setData({fitmentOptions: v})
        },
        "options.sale_status": function(v){
            this.setData({saleStatusOptions: v})
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        houseTypeItems: [
            { name: '不限', value: 0 },
            { name: '两室', value: 2 },
            { name: '三室', value: 3 },
            { name: '四室', value: 4 },
            { name: '五室及以上', value: 5 },
        ],

        catOptions: [], // 物业类型
        fitmentOptions: [], //装修
        saleStatusOptions: [], // 销售状态

        houseTypeValue: 0,
        fitmentValue: 0,
        catValue: 0,

        areaMin: null,
        areaMax: null,
        showPop: false,
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

        showFilterHandle: function (e) {
            this.setData({ showPop: true })
        },
        filterConfirmHandle: function (e) {
            // validate 
            // check price range 
            // 价格输入框的2个值，必须同事输入

            // check area range 
            // TODO move to range-input component
            if (this.data.areaMin === null && this.data.areaMax != null) {
                wx.showToast({
                    title: '请输入面积范围',
                    icon: 'none',
                });
                return false
            }
            if (this.data.areaMin != null && this.data.areaMax === null) {
                wx.showToast({
                    title: '请输入面积范围',
                    icon: 'none',
                });
                return false
            }

            // 拼接filter
            var filter = this.data.filter

            if (this.data.areaMin != null) {
                filter.area = this.data.areaMin + ',' + this.data.areaMax
            }

            var v = this.data.houseTypeValue
            if (v == 0) {
                delete filter.type
            } else {
                filter.type = v
            }

            v = this.data.catValue 
            if(v == 0 ){
                delete filter.cat_id
            }else{
                filter.cat_id =v 
            }
            filter.page = 1
            this.setData({ filter: filter })
            this.triggerEvent('change', filter)
            console.log('filter on change ', filter)
            this.setData({ showPop: false })
        },
        filterCancleHandle: function (e) {
            this.setData({
                areaMin: null,
                areaMax: null,
                houseTypeValue: 0
            })
        },


        priceChange: function (e) {
            console.log('e', e)
            var filter = this.data.filter 
            var data = e.detail
            if(data.price && data.price.length >= 3){
                filter.price = data.price
            }else{
                delete filter.price
            }

            if(data.total_price && data.total_price.length >= 3){
                filter.total_price = data.total_price
            }else{
                delete filter.total_price
            }
            this.setData({filter: filter})
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
