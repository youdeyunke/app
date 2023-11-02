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
// components/pagemaker/blocknavs/style5.js
const link = require('../link.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },

    observers: {
        "config.image": function (url) {
            if (!url) {
                return
            }
            this.setData({
                image: "url('" + url + "')"
            })

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        image: null

    },

    /**
     * 组件的方法列表
     */
    methods: {

        clickHandle: function (e) {
            const { index } = e.currentTarget.dataset
            var data = this.data.config.blocks[index].link
            link.clickHandle(data)
        }

    }
})
