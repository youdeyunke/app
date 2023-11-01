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
const nums = []

for (let i = 1; i <= 50; i++) {
    nums.push(i)
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
        nums: nums,
        value: [0, 9, 1],
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
            var current = this.data.nums[v[0]]
            var total = this.data.nums[v[1]]
            var has_lift = v[2] == 1 ? true : false
            this.triggerEvent('confirm', {
                current_floor: current,
                total_floor: total,
                has_lift: has_lift,
            }, {})
        },
    }
})
