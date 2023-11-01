/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/sub-district/filter.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        initValue: {
            type: Object, value: {}
        },

        configs: {
            type: Array,
            value: [
                { name: '位置', type: 'citypicker', },
                app.globalData.filterAreaItem,
                app.globalData.filterRentPriceItem,
                app.globalData.filterOrderItem,
            ]
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

        updateConfig: function (index, config) {
            var data = {}
            var key = 'configs[' + index + ']'
            data[key] = config
            this.setData(data)
        },

        filterChange: function () {
            var data = this.data.initValue
            var _this = this
            var keys = ['city_id', 'district_id', 'subway_id', 'station_id']
            keys.forEach(function (key, i) {
                var v = _this.data[key] || ''
                data[key] = v
            })

            var _this = this
            for (var i = 0; i <= this.data.configs.length - 1; i++) {
                var c = _this.data.configs[i]
                if (c && c.type == 'picker') {
                    var item = _this.data[c.key]
                    if (item) {
                        data[c.key] = item.value || ''
                        console.log('set c.key', c.key, 'value ', item.value)
                    } else {
                        console.log('do not set data, key is', c.key, 'item is ', item)
                    }
                }

            }

            this.setData({ initValue: data })
            this.triggerEvent('change', data, {})
        },

        cityChange: function (e) {
            console.log('city change receive ', e.detail)
            var data = {}
            var keys = ['city_id', 'district_id', 'subway_id', 'station_id']
            keys.forEach(function (key, i) {
                var v = e.detail[key]
                data[key] = v || ''
            })

            this.setData(data)
            this.filterChange()
        },

        pickerChange: function (e) {
            console.log('picker change receive', e.detail)
            var key = e.detail.key
            var data = {}
            data[key] = e.detail.item
            this.setData(data)
            console.log('set data resut is ', this.data)
            this.filterChange()
        },

        cellTap: function (e) {
            var i = e.currentTarget.dataset.index
            var config = this.data.configs[i]
            config.show = true
            this.updateConfig(i, config)

        },
    }

})
