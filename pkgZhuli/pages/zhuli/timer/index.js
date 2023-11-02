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
// pkgZhuli/pages/zhuli/timer/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        date: { type: String, value: '' },
    },

    observers: {
        "date": function (v) {
            if (!v) {
                return
            }
            var date = new Date(v)
            this.setData({
                timestamp: date.getTime()
            })
            var _this = this
            setInterval(() => {
                this.timerLoop()
            }, 1000)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        timestamp: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        timerLoop: function () {
            var now = new Date()
            // 计算剩余的秒数
            var s = this.data.timestamp - now.getTime()
            if (s <= 0) {
                // 已结束
                return
            }
            // 计算时间差
            var days = parseInt(s / 1000 / 60 / 60 / 24)
            var hours = parseInt(s / 1000 / 60 / 60 % 24)
            var minutes = parseInt(s / 1000 / 60 % 60)
            var seconds = parseInt(s / 1000 % 60);
            this.setData({
                days: days, hours: hours, minutes: minutes, seconds: seconds,
            })
        },

    }
})
