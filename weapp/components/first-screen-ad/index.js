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
const app = getApp()
const link = require('../page-home/link')
const first_screenApi = require("../../api/first_screen")

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    ready: function () {
        var _this = this
        _this.loadData()
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        second: 5,
        link: {},
        image: '',
        id: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadData () {
            var _this = this
            // √
            first_screenApi.getFirstScreen().then((res) => {
                let value = res.data.data
                if (!value || value == '暂无数据') {
                    return false
                }

                var link = {}
                if (value.link) {
                    link = JSON.parse(value.link)
                }

                _this.setData({
                    id: value.id,
                    link: link,
                    image: value.image,
                    second: value.time || 10,
                    show: true
                })
                _this.timeoutHandle()
            })
        },

        uploadData (data) {
            data.id = this.data.id,

                first_screenApi.updateFirstScreenAdd(
                    data
                ).then((res) => {

                })
        },
        adClick: function (e) {
            link.clickHandle(this.data.link)
            this.uploadData({
                click_nums: 1
            })
        },

        closeHandle: function (e) {
            this.setData({
                show: false
            })
            if (this.data.second >= 0) {
                this.uploadData({
                    skip_nums: 1
                })
            }
        },

        timeoutHandle: function () {
            // 开启倒计时 

            var _this = this
            var second = this.data.second - 1
            this.setData({
                second: second
            })

            // 倒计时结束，关闭
            if (second == 0) {
                this.setData({
                    show: false
                })
                this.uploadData({
                    view_nums: 1
                })
                return
            }


            setTimeout(() => {
                _this.timeoutHandle()
            }, 1000)


        },
    }
})