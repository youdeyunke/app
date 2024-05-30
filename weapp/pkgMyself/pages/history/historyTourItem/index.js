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
// pkgMyself/pages/history/historyTourItem/index.js
const tourApi = require("../../../../api/tour")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tourId: { type: Number, default: null }
    },

    observers: {
        "tourId": function (value) {
            var _this = this
            if (value) {
                tourApi.getTourDetail(value).then((resp) => {
                    if (resp.data.status != 0) {
                        return
                    }
                    _this.setData({
                        tour: resp.data.data
                    })
                })
            }
        }
    },


    /**
     * 组件的初始数据
     */
    data: {
        tour: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
