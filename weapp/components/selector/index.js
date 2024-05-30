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
// components/selector/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Number, value: 0 },
        valueKey: { type: String, value: 'value' },
        options: { type: Array, value: [] },
        columns: { type: Number, value: 3 },

    },

    observers: {
        columns: function (v) {
            // 设置控制每行显示多少列的class
            if (!v) {
                return
            }
            var n = "col" + v
            this.setData({ optionListClassName: n })
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        optionListClassName: 'col3'

    },

    /**
     * 组件的方法列表
     */
    methods: {
        optionClickHandle: function (e) {
            console.log('e', e, 'value key is ', this.data.valueKey)
            const { index } = e.currentTarget.dataset
            var option = this.data.options[index]
            var value = option[this.data.valueKey]

            this.setData({ value: value })
        },

    }

})
