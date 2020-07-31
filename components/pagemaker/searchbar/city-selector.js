// components/pagemaker/searchbar/city-selector.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },

    observers: {
        "config.id": function (cityId) {
            // TODO 设置全局选择的city id
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        cityItems: [],
        cityId: null,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadAllCity: function () {
            app.request({
                url: '/api/v1/cities',
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return
                    }
                    _this.setData({ cityItems: resp.data.data })
                }
            })
        },

    }
})
