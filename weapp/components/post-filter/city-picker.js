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
// pages/post/filter/city-picker.js
const app = getApp()
const cityApi = require("../../api/city")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cityId: { type: Number, default: null },
        districtId: { type: Number, default: null },
    },

    observers: {
        cityIndex: function (i) {
            // city index 修改后，自动刷新city 数据
            if (this.data.cityItems.length == 0) {
                return false
            }
            var city = this.data.cityItems[i]
            this.setData({ city: city })
        },
    },

    ready: function () {
        // 加载城市数据
        this.loadCityData()
    },

    /**
     * 组件的初始数据
     */
    data: {
        popShow: false,
        cityItems: [],

        city: null,
        district: null,
        cityIndex: 0, // 城市索引 
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cityClick: function (e) {
            // 点击切换城市后，要清空district id 
            const { index } = e.detail
            this.setData({ cityIndex: index, district: null })
        },

        districtClick: function (e) {
            var district = e.detail
            console.log('distirct is', district, e.detail)
            this.setData({ district: district })
        },

        onConfirm: function (e) {
            this.popToggleHandle()
            var city_id = this.data.city ? this.data.city.id : null
            var districtId = this.data.district ? this.data.district.id : null
            this.triggerEvent("change", { city_id: city_id, district_id: districtId })
        },

        onReset: function (e) {
            // 重置为默认值
            this.setData({
                district: null,
                cityIndex: 0,
            })

        },
        popToggleHandle: function (e) {
            var _this = this
            this.setData({
                popShow: !_this.data.popShow
            })
        },

        loadCityData: function () {
            var _this = this
            cityApi.getCityListV6().then((resp) => {
                if (resp.data.status != 0) {
                    return false
                }
                console.log(resp.data.data);
                // cityitems for van-tree-select 
                var items = resp.data.data.map((city, i) => {
                    if (i == 0) {
                        city.text = '全部'
                    }
                    return city
                })
                // 根据默认的city id 找到对应的index 
                var cityIndex = items.findIndex((city, index) => { return city.id == _this.data.cityId })
                cityIndex = cityIndex <= 0 ? 0 : cityIndex // find index whill return -1 if not find
                _this.setData({ cityItems: items, cityIndex: cityIndex })
            })
        }

    }
})
