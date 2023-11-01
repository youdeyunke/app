/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgBroker/pages/broker/components/broker-group-selector/index.js
const app = getApp()
const brokerApi = require("../../../../../api/broker")

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        groups: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {

        open: function (cat) {
            this.loadData(cat)
            this.setData({ show: true })
        },
        close: function () {
            this.setData({ show: false })
        },

        selectHandle: function (e) {
            const { index } = e.currentTarget.dataset
            var g = this.data.groups[index]
            this.triggerEvent('change', g)
            this.close()
        },

        loadData: function (cat) {
            var _this = this
            var query = {
                cat: cat
            }
            brokerApi.getBrokerGroup(query).then((resp) => {
                if (resp.data.status != 0) {
                    return
                }
                var gs = resp.data.data.filter((g) => {
                    return true
                })

                // 只显示全民经纪人身份列表
                _this.setData({
                    groups: gs,
                })
            })
        },

    }
})
