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
// pkgMyself/pages/score/item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, default: null },
    },

    observers: {
        "item.amount": function (v) {
            if (v < 0) {
                var amount = 0 - v
                var icon = '-'
                var style = 'jian'
            } else {
                var amount = v
                var icon = '+'
                var style = 'jia'
            }
            this.setData({
                amount: amount,
                icon: icon,
                style: style,
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        amount: '-'

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
