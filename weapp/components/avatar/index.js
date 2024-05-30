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
// components/avatar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        border: {
            type: String,
            default: null,
        },
        size: {
            type: Number,
            default: 200,
        },
        src: {
            type: String,
            default: '',
        },
        borderWidth: {
          type: Number,
          value: 6,
        },

    },

    observers: {
        "border": function (color) {
            if (!color) {
                return
            }
            // this.setData({
            //     borderValue: "border:6rpx solid " + color
            // })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        borderValue: ''

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
