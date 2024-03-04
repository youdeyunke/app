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
// components/pagemaker/news/index.js
const app = getApp()
const tourApi = require("../../../api/tour")
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
        items: [],
    },

    /**
     * 组件的方法列表
     */
    methods: {

        loadData: function () {
            var _this = this
            var query = {}
            if (this.data.config.dataFrom === 'ids') {
                query.ids = this.data.config.ids.join(',')
            }
            query.limit = this.data.config.limit || 10
            tourApi.getTourList(query).then((resp) => {
                if (resp.data.status == 0) {
                    _this.setData({
                        items: resp.data.data
                    })
                }
            })
        },



    }
})