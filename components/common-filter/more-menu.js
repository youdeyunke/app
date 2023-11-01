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
// components/common-filter-v2/more-menu.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object
        },
        show: {
            type: Boolean,
        }
    },

    attached: function () {
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                btnColor: myconfigs.color.primary_btn,
                color: myconfigs.color.primary,
            })
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        valueItems: [],
        valueDict: {},

    },

    /**
     * 组件的方法列表
     */
    methods: {

        changeHandle: function (e) {
            var data = e.detail
            var dic = this.data.valueDict
            dic[data.key] = data.value
            this.setData({ valueDict: dic })
            return
        },

        confirmHandle: function (e) {
            var dict = this.data.valueDict
            var valueItems = Object.keys(dict).map((key) => {
                return { key: key, value: dict[key] }
            })
            this.triggerEvent('change', valueItems)
        }

    }
})
