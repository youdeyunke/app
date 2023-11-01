/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/howlong.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        date: { type: String, value: '' }

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    ready: function () {
        var ds = this.data.date.split('T')

        var dateStr = ds[0]
        dateStr += ' '
        dateStr += ds[1].split('.')[0]
        var value = this.getDateDiff(dateStr)
        this.setData({ value: value })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getDateDiff: function (dateStr) {
            console.log('date str', dateStr)
            var result = ''
            var dateTimeStamp = Date.parse(dateStr)
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - dateTimeStamp;
            if (diffValue < 0) { return; }
            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            if (monthC >= 1) {
                result = "" + parseInt(monthC) + "月前";
            }
            else if (weekC >= 1) {
                result = "" + parseInt(weekC) + "周前";
            }
            else if (dayC >= 1) {
                result = "" + parseInt(dayC) + "天前";
            }
            else if (hourC >= 1) {
                result = "" + parseInt(hourC) + "小时前";
            }
            else if (minC >= 1) {
                result = "" + parseInt(minC) + "分钟前";
            } else
                result = "1分钟";
            return result;
        }

    }
})
