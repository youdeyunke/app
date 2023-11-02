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
// components/common-filter-v2/menu-body.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
        },
        show: {
            type: Boolean,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        currentIndex: 0,


    },

    attached: function () {
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                color: myconfigs.color.primary,
            })
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

        itemClick: function (e) {
            const { index } = e.currentTarget.dataset
            this.setData({ currentIndex: index })
            var op = this.data.item.options[index]
            var data = {
                key: this.data.item.key,
                value: op.value
            }
            this.triggerEvent('change', data)

        }


    }
})
