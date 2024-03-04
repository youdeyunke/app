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
// components/pagemaker/text/index.js
const link = require('../link.js')
Component({
    /**
     * 组件的属性列表
     */

    properties: {
        config: { type: Object, default: null }
    },

    observers: {
        "config.fontSize": function (v) {
            v = v + 'rpx'
            this.setData({ fontSize: v })
        },

        "config.lineHeight": function (v) {
            v = v + '%'
            this.setData({ lineHeight: v })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        fontSize: '24rpx',
        lineHeight: '100%',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickHandle: function (e) {
            link.clickHandle(this.data.config.link)
        }

    }
})
