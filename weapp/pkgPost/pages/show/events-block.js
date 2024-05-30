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
// pages/post/events-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD' }
    },

    observers: {
        "value.items": function (items) {
            var events = []
            items.forEach((item, i) => {
                item['created_at'] = item['created_at'].split('T')[0]
                events.push(item)
            })
            this.setData({ event: items[0] })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        event: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
