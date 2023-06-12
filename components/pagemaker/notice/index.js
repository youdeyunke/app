// components/pagemaker/noticebar/index.js
const app = getApp()
const newsApi = require("../../../api/news")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, }

    },

    observers: {
        "config.icon": function (v) {
            if (!v) {
                return
            }
            if (v.length <= 5) {
                return
            }
            this.setData({ iconUrl: v })
        },
        "config.ids": function (ids) {
            this.loadNews(ids)
        },

        "config.fontSize": function(v){
            if(!v){
                return 
            }
            v = parseInt(v) 
            this.setData({
                fontSize: v + 'rpx'
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        // TODO default icon
        iconUrl: "https://qiniucdn.udeve.cn/fang2021/c91c5e84-55fd-4fb2-a0ac-edfee71d73c3.png",
        items: [],
        fontSize: '26rpx'

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

            var query = { ids: ids.join(',') }
            var _this = this
            // 有待检测
            // app.request({
            //     url: '/api/v1/news有待检测',
            //     hideLoading: true,
            //     data: query,
            //     success: function (resp) {
            //     }
            // })
            newsApi.getNewsList(query).then((resp)=>{
                if (resp.data.status == 0) {
                    _this.setData({ items: resp.data.data })

                }
            })
        }

    }
})
