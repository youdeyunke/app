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
// pkgBroker/pages/broker/search/index.js
const app = getApp()
const postApi = require("../../../../../api/post")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        serachresule: []
    },
    observers: {
        'value': function (v) {
            var myvalue = v
            var _this = this
            console.log("子组件value", myvalue)
            // ？？  未找到引用
            postApi.quickSearch(myvalue).then((res) => {
                _this.setData({
                    serachresule: res.data.data
                })
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        checkedHandle: function (e) {
            console.log("eeeeeeeeeeee", e)
            var mypost = e.currentTarget.dataset.mypost
            this.triggerEvent("checkedtitle", {
                mypost
            })
        }
    }
})