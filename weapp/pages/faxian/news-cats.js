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
            newsApi.getNewsCatList().then((resp) => {
                if (resp.data.status != 0) {
                    return
                }
                var cats = resp.data.data
                _this.setData({ cats: cats })
            })
        },



    }
})
