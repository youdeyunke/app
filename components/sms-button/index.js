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
// components/sms-button/index.js
const app = getApp()
const smsApi = require("../../api/sms")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        color: {
            type: String, value: '#333333',
        },
        mobile: {
            type: Number, value: null
        },
        size: {
            type: String, value: 'mini'
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        seconds: 0,

    },

    /**
     * 组件的方法列表
     */
    methods: {

        startTimer: function () {
            // 验证码倒数计时器 
            var seconds = 60
            var _this = this
            var iid = setInterval(() => {
                if (seconds <= 0) {
                    clearInterval(iid)
                    return
                }
                seconds -= 1
                _this.setData({
                    seconds: seconds,
                })
            }, 1000)
        },

        sendSms () {
            if (this.data.seconds > 0) {
                return false
            }
            var _this = this
            var phone = this.data.mobile
            if (!phone) {
                wx.showModal({ title: '请先填写手机号码', icon: 'none' })
                return false
            }
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                wx.showModal({ title: '手机号格式错误', icon: 'none' })
                return false
            }
            smsApi.sendSms(phone).then((res) => {
                wx.showToast({ title: '发送成功' })
                _this.setData({ yanzhengShow: true })
                _this.startTimer()
            })
        },

    }
})
