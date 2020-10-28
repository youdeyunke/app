// pages/faxian/news-cats.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    observers: {
        active: function (i) {
            var cat = this.data.cats[i]
            this.triggerEvent('change', cat)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        cats: [],
        active: 0,
    },

    ready: function () {
        this.loadNewsCats()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        catChange: function (e) {
            const { index } = e.currentTarget.dataset
            this.setData({ active: index })
        },
        loadNewsCats: function () {
            var _this = this
            app.request({
                url: '/api/v1/news_cats',
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return
                    }
                    var cats = resp.data.data
                    _this.setData({ cats: cats })
                }
            })
        },



    }
})
