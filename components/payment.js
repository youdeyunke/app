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
// components/typepicker.js
const nums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '二十四']

Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },

    ready: function () {
    },

    /**
     * 组件的初始数据
     */
    data: {
        ya: nums,
        fu: nums,
        value: [0, 2],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onShow: function () {
            this.setData({ show: true })
        },

        onClose: function () {
            this.setData({ show: false })
        },

        changeHandle: function (e) {
            var val = e.detail.value
            this.setData({ value: val })
        },

        onConfirm: function (e) {
            this.setData({ show: false })
            var v = this.data.value
            var ya = this.data.ya[v[0]]
            var fu = this.data.fu[v[1]]
            var text = "押" + ya + "付" + fu
            this.triggerEvent('confirm', { payment_cycle: text })
        },



    }
})
