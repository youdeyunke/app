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
// components/ud/image/index.js
Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['custom-class'],
    properties: {
        src: { type: String, value: null },
        mode: { type: String, value: "fit" },
    },

    observers: {
        "src": function (src) {
            if (src.startsWith('http')) {
                // 外部地址
                this.setData({ imageUrl: src })
                return
            }
            // 内部地址，替换为cdn地址
            var cdn = 'https://qiniucdn.udeve.net/fang-weapp-2021-assets'
            var suffix = ''
            src = src.replace('/assets', cdn)
            var url = src + suffix
            this.setData({ imageUrl: url })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imageUrl: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
