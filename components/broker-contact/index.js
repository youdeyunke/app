// pkgPost/components/broker-contact/index.js
const app = getApp()
const brokerApi = require("../../api/broker")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        broker: {
            type: Object,
            value: null
        },
        postId: {
            type: Number,
            value: null
        },
        bid: {
          type: Number,
          value: null
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        mode: 'full' // or mini
    },

    observers: {
        "bid": function (bid) {
            if (!bid) {
                return
            }

            // load broker info 
            var _this = this
            // TODO get from cache 
            brokerApi.getBrokerDetail(bid).then((resp) => {
                _this.setData({
                    broker: resp.data.data
                })
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chatHandle: function () {
            // TODO 如果咨询的是某个具体楼盘 将楼盘参数携带 
            // 防止自己和自己聊天  
            var user = app.globalData.userInfo
            if (!user) {
                wx.showToast({
                    title: '请先登陆',
                    icon: 'none',
                })
                return false
            }
            var uid1 = user.id
            var uid2 = this.data.broker.id

            if (uid1.toString() == uid2.toString()) {
                wx.showToast({
                    title: '不能和自己发起聊天',
                    icon: 'none',
                })
                return false
            }

            wx.navigateTo({
                url: '/pages/messages/show?target_user_id=' + this.data.broker.id,
            });

        },

        gotoProfile: function () {
            var url = '/pkgBroker/pages/broker/profile?id=' + this.data.broker.id
            wx.navigateTo({
                url: url,
            })
        },

        callHandle: function () {
            var phone = this.data.broker.mobile
            wx.makePhoneCall({
                phoneNumber: phone,
            });

        },

        closeHandle: function () {
            this.setData({
                mode: 'mini'
            })
        }

    }
})