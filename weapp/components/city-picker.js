/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/city-picker.js
const app = getApp()
const cityApi = require("../api/city")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        position: {
            type: String,
            value: "bottom"
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        activeTabIndex: 0,

        configs: [{
            label: '区域',
            id: 'city',
            url: '/api/v2/cities',
            keys: ['city_id', 'district_id'],
        },
            /* {
              label: '地铁',
              id: 'subway',
              url: '/api/v1/subway',
              keys: ['subway_id', 'station_id'],
            },      
            */
        ],

    },

    attached: function () {
        console.log('attached')
    },


    ready: function () {
        var _this = this
        this.data.configs.forEach(function (config, i) {
            //   √    base-filter,filter组件引入了该组件但base- 未被引用     pages/home/home被调用        
            cityApi.getCityListV6().then((resp) => {
                if (resp.data.status == 0) {
                    config.items = resp.data.data
                    _this.updateConfig(i, config)
                }
            })
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {


        onShow: function () {
            this.setData({
                show: true
            })
        },

        onClose: function () {
            this.setData({
                show: false
            })
        },


        onReset: function () {
            var _this = this
            this.data.configs.forEach(function (config, index) {
                config.mainActiveIndex = null
                config.activeId = null
                _this.updateConfig(index, config)
            })
            this.onConfirm()
        },

        onConfirm: function (e) {
            var _this = this
            var data = {

            }
            this.data.configs.forEach(function (config, index) {
                var mainIndex = config.mainActiveIndex
                // 处理第一级
                if (mainIndex != null) {
                    var main = config.items[mainIndex]
                    var mainId = main.id
                    var key = config.keys[0]
                    data[key] = mainId
                }

                // 处理第二级
                var activeId = config.activeId
                if (activeId != null) {
                    var key = config.keys[1]
                    data[key] = activeId
                }
            })

            console.log('trigger change data ', data)
            this.triggerEvent('change', data, {})
            this.onClose()
        },


        navClick: function (e) {
            var mainActiveIndex = e.detail.index
            var i = e.target.dataset.index
            var config = this.data.configs[i]
            config.mainActiveIndex = mainActiveIndex
            config.activeId = null
            this.updateConfig(i, config)

        },

        itemClick: function (e) {
            console.log('e', e)
            var item = e.detail
            var i = e.target.dataset.index
            var config = this.data.configs[i]
            config.activeId = item.id
            this.updateConfig(i, config)
        },

        updateConfig: function (index, config) {
            var data = {}
            var key = 'configs[' + index + ']'
            data[key] = config
            this.setData(data)
        }

    }
})