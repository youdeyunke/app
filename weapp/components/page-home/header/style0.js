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
// components/pagemaker/header/style0.js
const app = getApp()
const link = require('../link.js')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: { type: String, value: '' },
        icon: {type: String, value: null},
        subtitle: { type: String, value: '' },
        link: { type: Object, value: null },
        fontsize: { type: Number, value: 40 },
        fontcolor: { type: String, value: '#000000' },
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

        clickHandle: function (e) {
            link.clickHandle(this.data.link)
        }

    }
})
