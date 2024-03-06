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
// components/visitors/index.js
const app = getApp()
const visitorApi = require("../../api/visitor")

Component({
    /**
     * 组件的属性列表
     */
    properties: {

        targetId: {
            type: Number, value: 0,
        },

        limit: {
            type: Number, value: 5,
        },

        targetType: {
            type: String, value: 'post',
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    ready: function () {
        this.loadVisitors()
    },

    /**
     * 组件的方法列表
     */
    methods: {


        loadVisitors: function () {
            var _this = this
            var query = {
                target_id: _this.data.targetId,
                target_type: _this.data.targetType,
                per_page: _this.data.limit,
            }
            visitorApi.getVisitorList(query).then((resp) => {
                _this.setData({
                    visitors: resp.data.data,
                    visitorsMeta: resp.data.meta
                })
            })
        },

    }
})
