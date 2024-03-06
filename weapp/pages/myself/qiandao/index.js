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
// pages/myself/qiandao/index.js
const app = getApp()
const qiandaoApi = require("../../../api/qiandao")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        user: { type: Object, value: {} },

    },

    ready: function () {
        var _this = this
        var ui = app.globalData.myconfigs.ui
        var color = app.globalData.myconfigs.color

        var day = new Date()
        var y = day.getFullYear()
        var m = day.getMonth() + 1
        var d = day.getDate()
        var key = y + '-' + m + '-' + d + '.qiandao'
        var r = wx.getStorageSync(key)
        var checked = r === 'ok'
        _this.setData({
            key: key,
            checked: checked,
            primaryColor: color.primary,
            qiandaoImg: ui.myself_qiandao,
            yiqiandaoImg: ui.myself_yiqiandao,
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        weeks: [
            "",
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
        ],
        days: [],
        checked: false,
        showDialog: false,
        key: '',
        qiandaoImg: '',
        yiqiandaoImg: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {

        qiandaoHandle: function () {
            var _this = this
            var key = this.data.key
            qiandaoApi.qiandao().then((res) => {
                if (res.data.status != 0) {
                    return false
                }
                var days = res.data.data.week
                var today = res.data.data.today
                wx.setStorageSync(key, 'ok')
                _this.setData({ checked: true, showDialog: true, days: days, today: today })
            })
        },

        jifenHandle: function () {
            var url = '/pkgMyself/pages/score/index'
            wx.navigateTo({ url: url })
        },

        closeHandle: function () {
            this.setData({ showDialog: false })
        },


    }
})
