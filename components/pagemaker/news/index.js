// components/pagemaker/news/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },

    observers: {
        "config.ids": function (ids) {
            this.loadNews(ids)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

        items: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadNews: function (ids) {
            if (!ids) {
                return
            }
            if (ids.length == 0) {
                return
            }
            var query = ids.join(',')
            var _this = this
            app.request({
                url: '/api/v1/news',
                data: query,
                hideLoading: true,
                success: function (resp) {
                    if (resp.data.status == 0) {
                        var items = resp.data.data
                        console.log('load items is', items)
                        _this.setData({ items: items })
                    }
                }
            })
        }

    }
})
