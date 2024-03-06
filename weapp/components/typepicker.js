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
// components/typepicker.js
const shi = []
const ting = []
const wei = []
const positions = ['东', '南', '西', '北', '其它']

for (let i = 0; i <= 10; i++) {
    shi.push(i)
    ting.push(i)
    wei.push(i)
}

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
        shi: shi,
        ting: ting,
        wei: wei,
        positions: positions,
        show: false,
        value: [3, 2, 1, 1],
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
            var s = this.data.shi[v[0]]
            var t = this.data.ting[v[1]]
            var w = this.data.wei[v[2]]
            var p = this.data.positions[v[3]]
            this.triggerEvent('confirm', { s: s, t: t, w: w, position: p })
        },



    }
})
