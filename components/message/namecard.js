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
// components/message/namecard.js
const app = getApp()
const brokerApi = require("../../api/broker")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        message: {
            type: Object
        },

    },

    observers: {
        "message.content": function (uid) {
            this.loadBrokerProfile(uid)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表loadBrokerProfile 
     */
    methods: {

        callHandle: function () {
            wx.makePhoneCall({
                phoneNumber: this.data.broker.mobile,
            })
        },

        copyHandle: function () {
            if (!this.data.broker.wechat) {
                wx.showToast({
                    icon: 'none',
                    title: '未填写微信号，复制失败',
                })
                return false
            }
            wx.setClipboardData({
                data: this.data.broker.wechat,
            })
        },

        loadBrokerProfile: function (uid) {
            var _this = this
            //   √
            brokerApi.getBrokerShowDetail({
                user_id: uid
            }).then((resp) => {
                if (resp.data.status != 0) {
                    return
                }
                _this.setData({
                    broker: resp.data.data
                })
            })
        }

    }
})