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
// pages/post/filter/other-filter.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        options: { type: Object, value: {} },
    },

    observers: {
        "options.cats": function (v) {
            console.log('options change', v)
            if (!v) {
                return
            }
            this.setData({ catOptions: [{ name: '不限', id: 0 }].concat(v) })
        },
        "options.fitments": function (v) {
            if (!v) {
                return
            }
            this.setData({ fitmentOptions: [{ name: '不限', id: 0 }].concat(v) })
        },
        "options.sale_status": function (v) {
            if (!v) {
                return
            }
            this.setData({ saleStatusOptions: v })
        },
        "areaValue": function (v) {
            if (!v) {
                return
            }
            var arr = v.split(",")
            this.setData({
                areaMin: arr[0],
                areaMax: arr[1],
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        showPop: false,
        catOptions: [],
        fitmentOptions: [],
        saleStatusOptions: [],
        houseTypeItems: [
            { name: '不限', value: 0 },
            { name: '两室', value: 2 },
            { name: '三室', value: 3 },
            { name: '四室', value: 4 },
            { name: '五室及以上', value: 5 },
        ],
        houseTypeValue: 0,
        fitmentValue: 0,
        catValue: 0,
        areaValue: '',
        filter: {},

    },

    /**
     * 组件的方法列表
     */
    methods: {
        showPopHandle: function () {
            this.setData({ showPop: true })
        },

        showFilterHandle: function (e) {
            this.setData({ showPop: true })
        },
        filterConfirmHandle: function (e) {
            // validate 

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
            if (v == 0) {
                delete filter.cat_id
            } else {
                filter.cat_id = v
            }

            // convert fitment from index to id 
            var v = this.data.fitmentValue
            if (v == 0) {
                delete filter.fitment_id
            } else {
                filter.fitment_id = this.data.fitmentOptions[v].id
            }
            console.log('other filter is', filter)
            this.setData({ filter: filter })
            this.triggerEvent('change', filter)
            this.setData({ showPop: false })
        },
        filterCancleHandle: function (e) {
            this.setData({
                areaValue: '',
                catValue: 0,
                fitmentValue: 0,
                houseTypeValue: 0
            })
        },




    }
})
