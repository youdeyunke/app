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
            this.setCityId(cityId)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        popShow: false,
        cityItems: [], // 全部城市
        cityId: null,  // 当前选择城市
    },

    ready: function () {
        this.loadAllCity()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cityClick: function (e) {
            const { cityId } = e.currentTarget.dataset
            this.setData({ cityId: cityId })
        },

        submitHandle: function (e) {
            this.setCityId(this.data.cityId)
            this.onPopClose()
        },
        resetHandle: function (e) {
            this.setCityId(null)
            this.onPopClose()
        },
        onPopShow: function (e) {
            this.setData({ popShow: true })
        },
        onPopClose: function (e) {
            this.setData({ popShow: false })
        },

        setCityId: function (cid) {
            this.setData({ cityId: cid })
            app.globalData.cityId = cid
        },

        loadAllCity: function () {
            var _this = this
            app.request({
                url: '/api/v1/cities',
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return
                    }
                    var items = resp.data.data
                    items = [{ name: '全国', id: null }].concat(items)
                    _this.setData({ cityItems: items })
                }
            })
        },

    }
})
