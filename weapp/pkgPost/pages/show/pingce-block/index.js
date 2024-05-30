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
// pages/post/pingce-block/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD' }
    },

    /**
     * 组件的初始数据
     */
    data: {
        zongpingfen: 0,
        zhezhao: true
    },
    ready: function () {
        this.calculateAverage()
    },
    /**
     * 组件的方法列表
     */
    methods: {

        calculateAverage () {
            var arr = this.data.value.pingceList
            let sum = 0;
            let count = 0;

            for (let i = 0; i < arr.length; i++) {
                sum += arr[i].score;
                count++;
            }
            const average = (sum / count).toFixed(1);
            this.setData({
                zongpingfen: average
            })
        },
        jiesuobtn () {
            wx.navigateTo({
                url: '/pkgPingce/pages/pingce/index?postid=' + this.data.value.postId,
            })
        }
    }
})
