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
// components/pagemaker/banners/index.js
const link = require("../link")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },



    observers: {

    },


    /**
     * 组件的初始数据
     */
    data: {
        items:[
            {
                "link": {
                    "path": "",
                    "cat": "no",
                    "appid": "",
                    "function": "",
                    "opentype": "",
                    "url": "",
                    "apppath": ""
                },
                "title": "图片1",
                "url": "https://qiniucdn.udeve.cn/fang2021/4bbe636b-e0e8-4580-8bb0-66bbf61f11bd.png"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goto: function (e) {
            var index = e.currentTarget.dataset.index
            var block = this.data.config.items[index]
            link.clickHandle(block.link)
        },
    }
})
