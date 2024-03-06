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
// pages/fenxiao/customer-item.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: null },

    },

    observers: {
        "item.id": function (val) {
        },

        "item.created_at": function (t) {
            console.log('created', t)
            var dt = t.split('T')[0]
            var tm = t.split('T')[1].split('.')[0]
            var v = dt + ' ' + tm
            this.setData({
                createdAt: v
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {


    },

    /**
     * 组件的方法列表
     */
    methods: {}

})
