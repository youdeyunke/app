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
// components/ud/ud-tabs/index.js
const app = getApp()


Component({
    /**
     * 组件的属性列表
     */
    externalClasses: [],
    properties: {
        data: { type: Array },
        activeIndex: { type: Number, value: 0 }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    ready: function () {
        var color = app.globalData.myconfigs.color
        this.setData({
            primaryColor: color.primary,
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tabChange (e) {
            const { index } = e.currentTarget.dataset
            this.setData({
                activeIndex: index
            })
            this.triggerEvent('change', index)
        }
    }
})
