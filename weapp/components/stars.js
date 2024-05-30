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
// pages/comments/stars.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Number, value: 5 },
        big: { type: Boolean, value: false },
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

        scoreClick: function (e) {
            var score = e.currentTarget.dataset.value
            console.log('click score, ', score)
            this.triggerEvent('scoreChange', { score: score })

        },

    }
})
