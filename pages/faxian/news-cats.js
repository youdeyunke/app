// pages/faxian/news-cats.js
const app = getApp()
const newsApi = require("../../api/news")
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
            // 有待检测
            // app.request({
            //     url: '/api/v1/news_cats有待检测',
            //     success: function (resp) {
                 
            //     }
            // })
            newsApi.getNewsCatList().then((resp)=>{
                if (resp.data.status != 0) {
                    return
                }
                var cats = resp.data.data
                _this.setData({ cats: cats })
            })
        },



    }
})
