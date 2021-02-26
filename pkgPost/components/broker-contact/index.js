// pkgPost/components/broker-contact/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        broker: {
            type: Object, value: null,
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        mode: 'full' // or mini
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chatHandle: function () {
            wx.navigateTo({
                url: '/pages/messages/show?broker_id=' + this.data.broker.id,
            });

        },

        callHandle: function () {
            var phone = this.data.broker.mobile
            wx.makePhoneCall({
                phoneNumber: phone,
            });

        },

        closeHandle: function () {
            this.setData({ mode: 'mini' })
        }

    }
})
