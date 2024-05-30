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
// components/safe-tips.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cat: { type: String, value: '' }
    },

    /**
     * 组件的初始数据
     */
    data: {
        statement: '',
        info: {
            new: {
                title: '',
                desc: '',
            },
            old: {
                title: '本平台承诺真实房源假一赔百元!',
                desc: '',
            },
            rental: {
                title: '',
                desc: '',
            },
        }
    },
    attached () {
        this.loadData()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        loadData () {
            var config = app.globalData.myconfigs
            this.setData({
                statement: config.statement
            })
        }
    }
})
