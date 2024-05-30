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
// pages/post/brokers-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, default: {} },
        color: { type: String, value: '#3A6BDD' },
        theme: { type: String }
    },

    observers: {
        "value.items": function (vals) {
            if (!vals) {
                return
            }
            var brokers = vals.sort((a,b)=>{
              return a.level - b.level
            }).filter((v, i) => {
                return i <= 2
            })
            this.setData({ brokers: brokers })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        maxLength: 3,
        moreBrokersBtn: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        moreBrokersHandle: function () {
            // 显示更多经纪人
            var _this = this
            this.setData({
                moreBrokersBtn: false,
                maxLength: _this.data.value.brokers.length
            })
        },

    }
})
