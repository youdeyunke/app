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
// components/sex-input.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        options: {
            type: Array, value: [
                { label: '开启', value: true },
                { label: '关闭', value: false },
            ]
        },
        value: { type: String, value: 'ok' },
        type: { type: String, value: 'primary' },
        size: { type: String, value: 'small' },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        itemSelect: function (e) {
            var i = e.currentTarget.dataset['index']
            var option = this.data.options[i]
            this.triggerEvent('change', option)
        },

    }
})
