// components/tt.js
const app = getApp()

Component({
    options: {
        addGlobalClass: false,
        externalClasses: ['my-class'],
    },

    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: {} }
    },

    /**
     * 组件的初始数据
     */
    data: {
        hotImg: 'http://jiayaosu-10013564.image.myqcloud.com/d0ae4479-b76a-45f7-b4d5-186ec401439c',
        newImg: 'http://jiayaosu-10013564.image.myqcloud.com/0515466c-7507-498c-944c-7c8029f343fd',

    },

    ready: function () {
        var _this = this
        var time_ago = this.getDateDiff(_this.data.item.created_at)
        this.setData({ time_ago: time_ago })
        var badgeImg = null
        if (this.data.item.is_new) {
            badgeImg = this.data.newImg
        } else if (this.data.item.is_hot) {
            badgeImg = this.data.hotImg
        }
        this.setData({ badgeImg: badgeImg })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        newsClick: function () {
            var _this = this
            var url = this.data.item.url
            var path = '/pages/news/show?id=' + this.data.item.id
            // 判断是打开webview，还是显示自定义内容
            if (url) {
                app.gotoWebview(url, this.data.item.title)
                return false
            }
            wx.navigateTo({ url: path, })

        },

        getDateDiff: function (dateStr) {
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
