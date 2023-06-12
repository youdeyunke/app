// components/pagemaker/news/index.js
const app = getApp()
const newsApi= require("../../../api/news")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: {
            type: Object,
            default: null
        }
    },

    ready: function () {
        var color = app.globalData.myconfigs.color
        this.setData({
            primaryColor: color.primary,
        })
        this.loadData()

    },


    /**
     * 组件的初始数据
     */
    data: {
        cats: [],
        active: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        loadData: function () {
            var _this = this
            // 有待检测
            // app.request({
            //     url: '/api/v1/news_summary有待检测',
            //     method: 'GET',
            //     success: function (resp) {
                   
            //     },
            // })
            newsApi.getNewsSummary().then((resp)=>{
                if (resp.data.status == 0) {
                    var cats = resp.data.data.filter((cat, i) => {
                        return cat.items.length > 0
                    })
                    _this.setData({
                        cats: cats,
                    })
                }
            })
        },



    }
})