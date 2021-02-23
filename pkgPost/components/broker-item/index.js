// components/broker-item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: null }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        chatHandle: function () {
            // TODO 
            wx.showToast({
                title: 'todo...',
                icon: 'none',
            });

        },
        phoneHandle: function () {
            var _this = this
            wx.makePhoneCall({
                phoneNumber: _this.data.item.mobile,
                success: (result) => {
                },
            });
        },
    }
})
