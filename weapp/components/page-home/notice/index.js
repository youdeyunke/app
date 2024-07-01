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
// components/pagemaker/noticebar/index.js
const app = getApp()
const newsApi = require("../../../api/news")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        ids: { type: Array },
    },

    observers: {
        "ids": function (ids) {
            this.loadNews(ids)
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        // TODO default icon
        iconUrl: "https://tcdn.udeve.net/fang2021/c91c5e84-55fd-4fb2-a0ac-edfee71d73c3.png",
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
            newsApi.getNewsList(query).then((resp)=>{
                if (resp.data.status == 0) {
                    _this.setData({ items: resp.data.data })

                }
            })
        }

    }
})
